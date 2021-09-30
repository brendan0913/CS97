#!/usr/bin/python3

"""
Write a random permutation of the input lines to standard output.

With no FILE, or when FILE is -, read standard input.

"""

import random, sys
import argparse

def main():
    usage_msg = """shuf [OPTION]... [FILE]
    or:  shuf -e [OPTION]... [ARG]...
    or:  shuf -i LO-HI [OPTION]..."""

    desc_msg = """Write a random permutation of the input lines to standard output.
 With no FILE, or when FILE is -, read standard input."""

    parser = argparse.ArgumentParser(usage=usage_msg,description=desc_msg)
    parser.add_argument("pos", nargs='*')
    parser.add_argument("-e", "--echo",
                        action="store_true",
                        help="treat each ARG as input line")
    parser.add_argument("-i", "--input-range",
                        action="store",
                        help= "treat each number LO through HI as an input line")
    parser.add_argument("-n", "--head-count",
                         action = "store", help="output at most COUNT lines")
    parser.add_argument("-r", "--repeat",
                        action="store_true",
                        help="output lines can be repeated")
    args = parser.parse_args()

    if args.echo and args.input_range:
        parser.error("cannot combine -e and -i options")
        
    if args.echo:
        text=args.pos

    elif args.input_range:
        if '-' not in args.input_range:  # instead of a LO-HI range being inputted, it is, for example, a string 'abc'
            parser.error("invalid input range: '{0}'".format(args.input_range))
        lo_hi =args.input_range.split('-',1)
        try:
            lo_hi[0] = int(lo_hi[0])
        except:
            parser.error("invalid input range: '{0}'".format(lo_hi[0]))
        try:
            lo_hi[1] = int(lo_hi[1])
        except:
            parser.error("invalid input range: '{0}'".format(lo_hi[1]))
        if args.repeat and lo_hi[0]-lo_hi[1] == 1: # edge case where LO is one higher than HI and repeat is called
            sys.stdout.write("shuf.py: no lines to repeat\n")
            return
        if lo_hi[1] < 0: # HI negative
            parser.error("invalid input range: '{0}'".format(lo_hi[1]))
        if lo_hi[0] - lo_hi[1] == 1: # edge case where HI is one less than LO, no error is outputted
            return
        if lo_hi[0] - lo_hi[1] > 1: # edge case where HI is more than one less than LO, error is outputted
            parser.error("invlid input range: '{0}'".format(args.input_range))
        text=list(range(lo_hi[0],lo_hi[1]+1))

    elif len(args.pos) == 0 or args.pos[0] == '-':
        if args.head_count is not None and int(args.head_count) < 0: # shuf -n -1 is error
            parser.error("invalid line count: '{0}'".format(args.head_count)) # shuf -n 0 returns nothing 
        if args.head_count is not None and int(args.head_count) == 0:
            return
        text = sys.stdin.readlines()
        text = list(map(lambda x: x.strip(),text)) # stdinput comes with \n separating the lines, strips the new lines
    else:
        if len(args.pos) > 1: # shuf a b c where a b and c are files returns the second file as an extra operand
            parser.error("extra operand: '{0}'".format(args.pos[1]))
        f = open(args.pos[0],'r')
        text = f.readlines()
        f.close()
        text = list(map(lambda x: x.strip(), text))

    if args.head_count is None:
        args.head_count = 0
    if args.head_count:
        try:
            head_count = int(args.head_count)
        except:
            parser.error("invalid line count: '{0}'".format(args.head_count))
    if int(args.head_count) < 0:
        parser.error("invalid line count: '{0}'".format(args.head_count))
    if args.head_count == '0':
        return

    if int(args.head_count) > len(text) and not args.repeat:
        args.head_count = len(text)
        
    if args.repeat and int(args.head_count):
        appendedList = []
        for i in range(0,int(args.head_count)):
            appendedList.append(random.choice(text))
        text = appendedList
    elif args.repeat and not int(args.head_count):
        for i in range(0,sys.maxsize): # repeats infinitely when no head count is specified but repeat is
            print(random.choice(text))
    else:
        text = random.sample(text,len(text))

    if int(args.head_count):
        text = text[0:int(args.head_count)]

    for i in range(len(text)):
        text[i] = str(text[i]) + '\n'

    for i in range(len(text)):
        sys.stdout.write(text[i])

if __name__ == '__main__':
    main()
