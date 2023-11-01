#write a program that takes an interger n as input
# display sum of digits
# reverse order of integers and then multiply it by 3

def getSum(n):
    sum = 0
    for digit in str(n): 
      sum += int(digit)      
    return sum

def reverseInt(n):
    product = 0
    n = n[::-1]
    product = int(n) * 3
    return product    

def main():
    n = input("Part a) Input value of n: ")
    getSum(n)
    print(f"The sum of each digit in {n} = {getSum(n)}")
    n = input("Part b) Input value of n: ")
    reverseInt(n)
    print(f"{n[::-1]} * 3 = {reverseInt(n)}")

if __name__ == "__main__":
    main()