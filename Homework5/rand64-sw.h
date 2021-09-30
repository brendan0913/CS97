#ifndef RAND64SW_H
#define RAND64SW_H

/* Input stream containing random bytes.  */
extern FILE *urandstream;
extern char* rsrc;

/* Initialize the software rand64 implementation.  */
void
software_rand64_init (void);

/* Return a random value, using software operations.  */
unsigned long long
software_rand64 (void);

/* Finalize the software rand64 implementation.  */
void
software_rand64_fini (void);

void
software_rand64_fini_no_malloc (void);

#endif