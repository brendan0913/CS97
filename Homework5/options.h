#ifndef OPTIONS_H
#define OPTIONS_H

enum Input { MRAND48, I_DEFAULT, RDRAND, SLASH_F };
enum Output { STDOUT, N };

struct opts {
    bool valid;
    enum Input input;
    enum Output output;
    char* r_src;
    unsigned int block_size;
    long long nbytes;
} opts;

void read_options(int argc, char* argv[], struct opts* opts);

#endif 