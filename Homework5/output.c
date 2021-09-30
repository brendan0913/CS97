#include <stdbool.h>
#include <stdio.h>
#include <stdlib.h>
#include <unistd.h>
#include "./output.h"

bool
writebytes (char* x, int size)
{
  int write_output = write(1, x, size);
  if (write_output <= 0) {
    fprintf (stderr, "Unable to write bytes.\n");
    exit(1);
  }
  else 
    return true;
}