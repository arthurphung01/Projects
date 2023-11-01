from fileinput import close
from tkinter import *
from turtle import clear
import numpy as np
from matplotlib import pyplot as plt

root = Tk()
root.title('Plotting the curve of a cardioid')
#root.iconbitmap('*')
root.geometry("400x200")

def singraph():
    theta = np.linspace(0, 2*np.pi, 1000)
    r = float(a.get()) + float(b.get()) * np.sin(theta)
    plt.polar(theta, r, color.get())
    plt.show()

def cosgraph():
    theta = np.linspace(0, 2*np.pi, 1000)
    r = float(a.get()) + float(b.get()) * np.cos(theta)
    plt.polar(theta, r, color.get())
    plt.show()

def clear():
    plt.cla()
    plt.show()

#Initializing labels to display user input
Label(root, text="Enter value for a").grid(row=0)
Label(root, text="Enter value for b").grid(row=1)
Label(root, text="Enter color: (b, g, r, c, m, y, k, or w)").grid(row=2)

#Create an Entry widget to accept User Input
a = Entry(root)
b = Entry(root)
color = Entry(root)

a.grid(row=0, column=1)
b.grid(row=1, column=1)
color.grid(row=2, column=1)

#sin plot button
sin_button = Button(root, text="Sin Plot", command=singraph).grid(row=3)

#cos plot button
cos_button = Button(root, text="Cos Plot", command=cosgraph).grid(row=4)

#reset button
reset_button = Button(root, text="Reset Plot", command=clear).grid(row=5)

root.mainloop()