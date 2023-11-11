list = []

n = int(input("Enter numbers: "))
for i in range(0, n):
    number = int(input())
    list.append(number)

list.sort()
print(list)

"""if (number > 14):
    for i in range(0, n):
        print(number)
        list.remove(number)
if (number < 14):
    for i in range(0, n):
        print(number)
        list.remove(number)"""
