#include <stdlib.h>
#include <time.h> 
#include "./mrand48-r.h"

struct drand48_data buf;

void mrand48_rng_init(void)
{
  srand48_r(time(NULL), &buf);
}

unsigned long long mrand48_rng(void)
{
  long int a, b;
  mrand48_r(&buf, &a);
  mrand48_r(&buf, &b);
  return (((unsigned long long)(a) << 32) |
   ((unsigned long long)(b) & 0xFFFFFFFF));
}

void mrand48_rng_fini(void)
{

}