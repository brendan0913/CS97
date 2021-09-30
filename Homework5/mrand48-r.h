#ifndef MRAND48_R
#define MRAND48_R

extern struct drand48_data buf;

/* Initialize the mrand48_r implementation.  */
void 
mrand48_rng_init(void);

/* Return a random value, using mrand48_r  */
unsigned long long 
mrand48_rng(void);

/* Finalize the mrand48_r implementation.  */
void
mrand48_rng_fini(void);

#endif