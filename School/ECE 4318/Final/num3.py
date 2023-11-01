# (1 + j)^1000
# w = (-1 + sqrt(3))/2
# w^3 = 1
# j is the square root of -1

import cmath

# compute (1 + j)^1000
y = (1 + 1j) ** 1000

# compute w^300, w = (-1 + sqrt(-3))/2
w = (-1 + cmath.sqrt(-3))/2
w = w ** 300

print(f"(1 + j)^1000 = {y}")
print(f"w^300 = {w}")