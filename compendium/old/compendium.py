import sys

if len(sys.argv) == 1:
	cur = None
	while True:
		try:
			r = input("> ")
			c, a = r.split(' ', 2)
			
			if c == 'quit':
				break
			elif c == 'add':
				cur.add(*a.split(' ', 2))
			elif c == 'ls':
				print(' '.join(cur.links))
			elif c == 'rm':
				while
		except e:
			print(e)
