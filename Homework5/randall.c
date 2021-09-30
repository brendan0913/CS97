/* Generate N bytes of random output.  */

/* When generating output this program uses the x86-64 RDRAND
   instruction if available to generate random numbers, falling back
   on /dev/random and stdio otherwise.

   This program is not portable.  Compile it with gcc -mrdrnd for a
   x86-64 machine.

   Copyright 2015, 2017, 2020 Paul Eggert

   This program is free software: you can redistribute it and/or
   modify it under the terms of the GNU General Public License as
   published by the Free Software Foundation, either version 3 of the
   License, or (at your option) any later version.

   This program is distributed in the hope that it will be useful, but
   WITHOUT ANY WARRANTY; without even the implied warranty of
   MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the GNU
   General Public License for more details.

   You should have received a copy of the GNU General Public License
   along with this program.  If not, see <http://www.gnu.org/licenses/>.  */

#include <errno.h>
#include <stdbool.h>
#include <stdio.h>
#include <string.h>
#include <stdlib.h>
#include <unistd.h>

#include "./options.h"
#include "./output.h"
#include "./rand64-hw.h"
#include "./mrand48-r.h"
#include "./rand64-sw.h"

/* Main program, which outputs N bytes of random data.  */
int
main (int argc, char **argv)
{
  /* Check args */
  struct opts opts;
  read_options(argc, argv, &opts);
  if (!opts.valid)
  {
    fprintf (stderr, "%s: incorrect usage \n", argv[0]);
    exit(1);
  }
  /* If there's no work to do, don't worry about which library to use.  */
  if (opts.nbytes == 0)
    return 0;

  /* Now that we know we have work to do, arrange to use the
     appropriate library.  */
  void (*initialize) (void);
  unsigned long long (*rand64) (void);
  void (*finalize) (void);
  if (rdrand_supported () && (opts.input == I_DEFAULT || opts.input == RDRAND))
  {
    initialize = hardware_rand64_init;
    rand64 = hardware_rand64;
    finalize = hardware_rand64_fini;
  }
  else if (!rdrand_supported() && opts.input == RDRAND)
  {
    fprintf(stderr, "Option 'rdrand' not supported on this hardware\n");
    exit(1);
  }
  else if (opts.input == MRAND48)
  {
    initialize = mrand48_rng_init;
    rand64 = mrand48_rng;
    finalize = mrand48_rng_fini;
  }
  else if (opts.input == SLASH_F)
  {
    rsrc = malloc(strlen(opts.r_src) * sizeof(char));
    if (rsrc == NULL)
    {
      fprintf(stderr, "File not specified\n");
      exit(1);
    }
    strcpy(rsrc, opts.r_src);
    initialize = software_rand64_init;
    rand64 = software_rand64;
    finalize = software_rand64_fini;
  }
  else if (!rdrand_supported ())
  {
    strcpy(rsrc, "/dev/random");
    initialize = software_rand64_init;
    rand64 = software_rand64;
    finalize = software_rand64_fini_no_malloc; // rsrc is not malloc'd, it is already
                                              // set to /dev/random
  }
  else 
  {
    fprintf(stderr, "Invalid option(s)\n");
    exit(1);
  }

  initialize ();
  unsigned int size_of_block = opts.block_size; // outputted at N * KiB each block, 1024 bytes
  unsigned int total_bytes = opts.nbytes;
  char* output_buffer = malloc(size_of_block * sizeof(char));
  int bytes_per_block = size_of_block / 8;
  do
  {
    int out_bytes = total_bytes < size_of_block ? total_bytes : size_of_block;
    for (int i = 0; i < bytes_per_block; i++) {
      unsigned long long x = rand64 ();
      memcpy(&output_buffer[i * sizeof(x)], &x, sizeof(x));
    }
    total_bytes -= out_bytes;
    writebytes(output_buffer, out_bytes);
  }
  while(0 < total_bytes);
  
  free(output_buffer);

  int output_errno = 0;

  if (fclose (stdout) != 0)
    output_errno = errno;

  if (output_errno)
    {
      errno = output_errno;
      perror ("output");
    }

  finalize ();
  return !!output_errno;
}
