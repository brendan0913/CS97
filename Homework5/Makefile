# Make x86-64 random byte generators.

# Copyright 2015, 2020 Paul Eggert

# This program is free software: you can redistribute it and/or
# modify it under the terms of the GNU General Public License as
# published by the Free Software Foundation, either version 3 of the
# License, or (at your option) any later version.

# This program is distributed in the hope that it will be useful, but
# WITHOUT ANY WARRANTY; without even the implied warranty of
# MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the GNU
# General Public License for more details.

# You should have received a copy of the GNU General Public License
# along with this program.  If not, see <http://www.gnu.org/licenses/>.  */

# Optimization level.  Change this -O2 to -Og or -O0 or whatever.
OPTIMIZE = -Og

# The C compiler and its options.
CC = gcc
CFLAGS = $(OPTIMIZE) -g3 -Wall -Wextra \
  -march=native -mtune=native -mrdrnd

# -fanalyzer -fsanitize=address -fsanitize=undefined

# The archiver command, its options and filename extension.
TAR = tar
TARFLAGS = --xz --transform 's,^,randall/,'
TAREXT = txz

default: randall

randall: *.c
	$(CC) $(CFLAGS) *.c -o $@

assignment: randall-assignment.$(TAREXT)
assignment-files = COPYING Makefile randall.c
randall-assignment.$(TAREXT): $(assignment-files)
	$(TAR) $(TARFLAGS) -cf $@ $(assignment-files)

submission: randall-submission.$(TAREXT)
submission-files = $(assignment-files) \
  notes.txt # More files should be listed here, as needed.
randall-submission.$(TAREXT): $(submission-files)
	$(TAR) $(TARFLAGS) -cf $@ $(submission-files)

.PHONY: default clean assignment submission

clean:
	rm -f *.o *.$(TAREXT) randall

check:
	if [ `./randall 100 | wc -c` -eq 100 ]; \
	then echo "test 1 passed"; \
	else echo "test 1 failed"; \
	fi;
	if [ `./randall -i rdrand 100 | wc -c` -eq 100 ]; \
	then echo "test 2 passed"; \
	else echo "test 2 failed"; \
	fi;
	if [ `./randall -i /dev/urandom 100 | wc -c` -eq 100 ]; \
	then echo "test 3 passed"; \
	else echo "test 3 failed"; \
	fi;
	if [ `./randall -i /dev/urandom -o 1 5000 | wc -c` -eq 5000 ]; \
	then echo "test 4 passed"; \
	else echo "test 4 failed"; \
    fi;
	if [ `./randall -i mrand48_r -o 1 5000 | wc -c` -eq 5000 ]; \
	then echo "test 5 passed"; \
	else echo "test 5 failed"; \
    fi;
	if [ `./randall -i mrand48_r -o stdio 5000 | wc -c` -eq 5000 ]; \
	then echo "test 6 passed"; \
	else echo "test 6 failed"; \
    fi;
	if [ `./randall -o 3 5000 | wc -c` -eq 5000 ]; \
	then echo "test 7 passed"; \
	else echo "test 7 failed"; \
    fi;
	if [ `./randall -o 3 6 | wc -c` -eq 6 ]; \
	then echo "test 8 passed"; \
	else echo "test 8 failed"; \
    fi;
	if [ `./randall -o 1 1024 | wc -c` -eq 1024 ]; \
	then echo "test 9 passed"; \
	else echo "test 9 failed"; \
    fi;
	if [ `./randall -o 1024 1 | wc -c` -eq 1 ]; \
	then echo "test 10 passed"; \
	else echo "test 10 failed"; \
    fi;
	if [ `./randall -o stdio 1000 | wc -c` -eq 1000 ]; \
	then echo "test 11 passed"; \
	else echo "test 11 failed"; \
    fi;
	if [ `./randall -o stdio 6 | wc -c` -eq 6 ]; \
	then echo "test 12 passed"; \
	else echo "test 12 failed"; \
    fi;