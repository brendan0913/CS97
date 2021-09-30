#include <stdbool.h>
#include <unistd.h>
#include <stdlib.h>
#include <string.h>
#include <stdio.h>
#include "./options.h"

void read_options(int argc, char* argv[], struct opts* opts)
{
    opts->valid = false;
    int c = 0;
    opts->input = I_DEFAULT;
    opts->output = STDOUT;
    while ((c = getopt(argc, argv, ":i:o:")) != -1) {
        switch(c) {
            case 'i':
                if (strcmp("rdrand", optarg) == 0) {
                    opts->input = RDRAND;
                }
                else if (strcmp("mrand48_r", optarg) == 0) {
                    opts->input = MRAND48;
                }
                else if ('/' == optarg[0]) {
                    opts->input = SLASH_F;
                    opts->r_src = optarg;
                }
                else if (optarg != NULL) { 
                    fprintf(stderr, "Unrecognized input option: '%s'\n", optarg);
                    exit(1);
                }
                else { break; }
                opts->valid = true;
                break;
            case 'o':
                if (strcmp("stdio", optarg) == 0) {
                    opts->output = STDOUT;
                }
                else {
                    opts->output = N;
                    opts->block_size = atoi(optarg) * 1024; // N KiB at a time, 1024 bytes
                    if (opts->block_size <= 0)
                    {
                      fprintf(stderr, "Invalid output option: '%s'\n", optarg);
                      exit(1);
                    }
                }    
                opts->valid = true;
                break;
            case ':':
                break;
            case '?':
                break;
            default:
                break;
        }
    }
    if (optind >= argc) {
        return;
    }

    opts->nbytes = atol(argv[optind]);
    if (opts->nbytes >= 0) {
        opts->valid = true;
        if (opts->output == STDOUT) // meaning -o or -o N is not requested
            opts->block_size = opts->nbytes;
    }
}