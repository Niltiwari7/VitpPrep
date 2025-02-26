import React, { useState } from 'react';
import { AiOutlineArrowLeft, AiOutlineBars } from 'react-icons/ai';
import { useDispatch, useSelector } from 'react-redux';
import { setDarkMode } from '../utils/slices/theme.slice';
import { FaMoon, FaSun } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { dracula } from 'react-syntax-highlighter/dist/esm/styles/prism';
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableFooter,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"


const OOPS = () => {
    const dispatch = useDispatch();
    const darkMode = useSelector((state) => state.theme.darkMode);
    const user = useSelector((state) => state.user.userInfo);
    const [sidebarOpen, setSidebarOpen] = useState(false);

    const toggleTheme = () => {
        dispatch(setDarkMode(!darkMode));
    };

    const toggleSidebar = () => {
        setSidebarOpen(!sidebarOpen);
    };

    return (
        <div className="flex flex-col min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-800 dark:text-gray-100">
            {/* Header */}
            <header className="w-full flex items-center justify-between px-6 py-4 bg-white dark:bg-gray-800 shadow-md fixed top-0 left-0 right-0 z-50">
                <Link to="/dashboard" className="flex items-center text-blue-600 dark:text-yellow-500 hover:underline">
                    <AiOutlineArrowLeft size={20} />
                    <span className="ml-2">Back To Profile</span>
                </Link>
                <div className="flex items-center gap-4">
                    <button
                        aria-label="Toggle theme"
                        onClick={toggleTheme}
                        className="p-2 bg-blue-600 dark:bg-yellow-500 text-white rounded-full shadow hover:scale-105 transition"
                    >
                        {darkMode ? <FaMoon size={18} /> : <FaSun size={18} />}
                    </button>
                    {user?.imageUrl && (
                        <img className="w-10 h-10 rounded-full object-cover shadow-md" src={user.imageUrl} alt="Profile" />
                    )}
                </div>
            </header>

            {/* Sidebar */}
            <aside className={`sm:hidden fixed top-16 left-0 h-full bg-gray-200 dark:bg-gray-800 shadow-lg transition-transform ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} sm:translate-x-0 sm:w-1/5 p-4 z-40`}>
                <h1 className="text-center text-xl font-bold mb-4">Content</h1>
            </aside>

            {/* Main Content */}
            <main className="w-full pt-20 px-6 flex flex-col sm:flex-row gap-6">
                <button onClick={toggleSidebar} className="sm:hidden fixed top-16 right-4 bg-blue-600 dark:bg-yellow-500 text-white p-2 rounded-full shadow-md">
                    <AiOutlineBars size={24} />
                </button>

                <div className="w-full sm:w-4/5 mx-auto">
                    <h1 className="text-center text-3xl font-bold text-blue-600 dark:text-yellow-500">Object-Oriented Programming</h1>
                    <p className="mt-2 text-lg">OOP stands for Object-Oriented Programming. It helps solve real-world problems using classes and objects.</p>

                    <h2 className="mt-4 text-xl font-semibold">Class</h2>
                    <p>Class is a user-defined data type with its own member functions and variables. It acts as a blueprint for creating objects.</p>
                    <h3 className="mt-3 font-semibold">Example</h3>
                    <SyntaxHighlighter language="cpp" style={dracula} className="rounded-md shadow-md">
                        {`class Student {
public:
    string name;
    int age;
};`}
                    </SyntaxHighlighter>

                    <h2 className="mt-4 text-xl font-semibold">Object</h2>
                    <p>An object is an instance of a class. It can access the properties and methods of the class.</p>
                    <h3 className='mt-3 font-semibold'>Example</h3>
                    <SyntaxHighlighter language='cpp' style={dracula} className='rounded-md shadow-md'>
                        {`class Student {
public:
    string name;
    int age;
    void display() {
        cout << "The student name is " << name << endl;
        cout << "The student age is " << age << endl;
    }
};

int main() {
    Student s1;   // Creating object of class Student
    s1.name = "John";
    s1.age = 20;
    s1.display();
    return 0;
}`}
                    </SyntaxHighlighter>

                    <h3 className='mt-3 font-semibold'>Output</h3>
                    <SyntaxHighlighter language='cpp' style={dracula} className='rounded-md shadow-md'>
                        {`The student name is John
The student age is 20`}
                    </SyntaxHighlighter>

                    <h2 className='mt-4 text-xl font-semibold'>Constructor</h2>
                    <p>A constructor is a special method that does not return anything. It is automatically invoked when an object is created.</p>
                    <h2 className='mt-4 text-xl font-semibold'>Types of Constructors</h2>
                    <ul className="list-disc ml-6">
                        <li>Default Constructor</li>
                        <li>Parameterized Constructor</li>
                        <li>Copy Constructor</li>
                    </ul>

                    <h2 className="mt-4 text-xl font-semibold">Characteristics of Constructors in C++</h2>
                    <ul className="list-disc ml-6">
                        <li>Constructor does not return anything.</li>
                        <li>Constructor name is the same as the class name.</li>
                        <li>Constructor cannot be declared in the private section (unless it's part of a design pattern like Singleton).</li>
                        <li>Constructor can be overloaded (C++ allows constructor overloading with different parameters).</li>
                        <li>Constructor is automatically called when an object is created.</li>
                        <li>Constructor does not have a return type, not even `void`.</li>
                        <li>A default constructor is called if no constructor is provided explicitly.</li>
                    </ul>
                    <h3 className='mt-4 text-lg font-semibold'>Example</h3>
                    <SyntaxHighlighter language='cpp' style={dracula} className='rounded-md shadow-md'>
                        {`class Student {
public:
    string name;
    int age;
    
    Student() {
        cout << "Default Constructor" << endl;
    }
    
    Student(string n, int a) {
        cout << "Parameterized Constructor" << endl;
        name = n;
        age = a;
    }
    
    Student(const Student &s) {
        cout << "Copy Constructor" << endl;
        name = s.name;
        age = s.age;
    }
    
    void display() {
        cout << "The student name is " << name << endl;
        cout << "The student age is " << age << endl;
    }
};

int main() {
    Student s;
    Student s1("John", 20); // Parameterized Constructor
    s1.display();
    Student s2(s1); // Copy Constructor
    s2.display();
    return 0;
}`}
                    </SyntaxHighlighter>
                    <h3 className='mt-3 font-semibold'>Output</h3>
                    <SyntaxHighlighter language='text' style={dracula} className='rounded-md shadow-md'>
                        {
                            `Default Constructor

Parameterized Constructor
The student name is John
The student age is 20

Copy Constructor
The student name is John
The student age is 20`
                        }
                    </SyntaxHighlighter>

                    <h2 className="mt-4 text-xl font-semibold">Destructor in C++</h2>

                    <p className="mt-2">
                        A <span className='font-bold'> destructor </span>in C++ is a special member function that is called automatically when an object goes out of scope or is explicitly deleted. It is used to release resources allocated to the object.
                    </p>

                    <h3 className="mt-4 text-lg font-semibold">Characteristics of Destructor:</h3>
                    <ul className="list-disc ml-6">
                        <li>Destructor has the same name as the class, but with a tilde (~) before it (e.g., `~MyClass`).</li>
                        <li>It does not return a value and does not take any arguments.</li>
                        <li>A destructor is called automatically when an object goes out of scope or is explicitly deleted.</li>
                        <li>It is used to clean up resources like memory, file handles, or other system resources that the object may have acquired.</li>
                        <li>A class can only have one destructor (it cannot be overloaded).</li>
                        <li>Destructors are invoked in the reverse order of construction when an object is destroyed.</li>
                    </ul>

                    <h3 className='mt-3 text-xl font-semibold'>Example</h3>
                    <SyntaxHighlighter language='cpp' style={dracula}>
                        {`class MyClass {
public:
    int x, y;

    // Constructor
    MyClass(int a, int b) {
        x = a;
        y = b;
        cout << "Constructor called!" << endl;
    }

    // Destructor
    ~MyClass() {
        cout << "Destructor called!" << endl;
    }

    void display() {
        cout << "x: " << x << ", y: " << y << endl;
    }
};

int main() {
    MyClass obj(10, 20);  // Constructor is called
    obj.display();
    // Destructor is called when obj goes out of scope
    return 0;
}
  `
                        }
                    </SyntaxHighlighter>

                    <h3 className='mt-3 text-xl font-semibold'>Output</h3>
                    <SyntaxHighlighter language='text' style={dracula}>
                        {`Constructor called!
x: 10, y: 20
Destructor called!`}
                    </SyntaxHighlighter>
                    <h2 className='mt-4 font-semibold text-xl'>Four Pillars of OOPS</h2>

                    <ul className='list-disc ml-6'>
                        <li>Abstraction</li>
                        <li>Polymorphism</li>
                        <li>Inheritence</li>
                        <li>Encapsulation</li>
                    </ul>

                    <p><span>Note:</span>The best way to remember the word APIE</p>

                    <h3 className="mt-4 font-semibold text-xl">Abstraction</h3>
                    <p>
                        Abstraction is the process of hiding the implementation details and showing only the functionality to the user.
                        It helps to reduce programming complexity and effort.
                    </p>

                    <h4 className="mt-4 text-lg font-semibold">Example to Understand Abstraction:</h4>
                    <p>
                        Let's say you're driving a car. When you drive, you only need to know how to use the steering wheel, accelerator, and brakes to control the car.
                        You don't need to know how the engine works, how the fuel system operates, or the details of how the brakes are designed.
                    </p>
                    <p>
                        In this analogy, the car's complex system is abstracted from you, and you interact only with the controls that matter for driving.
                    </p>

                    <h4 className="mt-4 text-lg font-semibold">Code Example in C++:</h4>

                    <SyntaxHighlighter language="cpp" style={dracula} className="rounded-md shadow-md">
                        {`class Car {
public:
    // Abstract method (Only declaration)
    virtual void drive() = 0; 

    // Regular method
    void stop() {
        cout << "The car has stopped." << endl;
    }
};

class Tesla : public Car {
public:
    // Implementation of the abstract method
    void drive() override {
        cout << "Driving a Tesla... the car accelerates smoothly!" << endl;
    }
};

int main() {
    Tesla tesla;
    tesla.drive();  // Calling the abstraction
    tesla.stop();   // Calling the regular method

    return 0;
}
        `}
                    </SyntaxHighlighter>

                    <p>
                        In the above code, we have:
                        <ul className="list-disc ml-6">
                            <li><strong>Abstract class (Car)</strong>: This class defines the common interface for all cars (e.g., `drive()` method), but doesn't provide the actual implementation.</li>
                            <li><strong>Concrete class (Tesla)</strong>: This class provides the implementation for the `drive()` method, making the car functional.</li>
                        </ul>
                        The user of the car (in this case, the `Tesla` class) only interacts with the abstract `drive()` method, and does not need to know how the car works internally.
                    </p>

                    <h3 className='mt-3 text-lg font-semibold'>Output</h3>
                    <SyntaxHighlighter language='text' className='rounded-md shadow-md' style={dracula}>
                        {`Driving a Tesla... the car accelerates smoothly!
The car has stopped.`}
                    </SyntaxHighlighter>

                    <h3 className="mt-4 font-semibold text-xl">Polymorphism</h3>
                    <p>
                        Polymorphism is the ability of an object to take many forms. It allows objects of different classes to be treated as objects of a common superclass.
                    </p>

                    <h4 className="mt-4 text-lg font-semibold">Polymorphism Types:</h4>
                    <p>
                        Polymorphism in OOP can be categorized into two types:
                        <ul className="list-disc ml-6">
                            <li><strong>1. Compile-Time Polymorphism</strong></li>
                            <ul className="list-disc ml-8">
                                <li>a) <strong>Function Overloading</strong></li>
                                <li>b) <strong>Operator Overloading</strong></li>
                            </ul>
                            <li><strong>2. Run-Time Polymorphism</strong></li>
                        </ul>
                    </p>

                    <h4 className="mt-4 text-lg font-semibold">1. Compile-Time Polymorphism:</h4>

                    <p><strong>a) Function Overloading:</strong> Function overloading is when two or more functions in the same scope have the same name but different parameters (different number or types of arguments).</p>

                    <SyntaxHighlighter language="cpp" style={dracula} className='rounded-md shadow-md'>
                        {`
#include <iostream>
using namespace std;

class Printer {
public:
    // Function Overloading
    void print(int i) {
        cout << "Printing integer: " << i << endl;
    }
    void print(double d) {
        cout << "Printing double: " << d << endl;
    }
    void print(string s) {
        cout << "Printing string: " << s << endl;
    }
};

int main() {
    Printer p;
    p.print(10);       // Calls print(int)
    p.print(3.14);     // Calls print(double)
    p.print("Hello");  // Calls print(string)

    return 0;
}
        `}
                    </SyntaxHighlighter>

                    <p>In the above example, the function `print()` is overloaded with different parameters, making it capable of printing different data types.</p>

                    <p><strong>b) Operator Overloading:</strong> Operator overloading allows you to define the behavior of operators (+, -, *, etc.) for objects of user-defined classes.</p>

                    <SyntaxHighlighter language="cpp" style={dracula} className='rounded-md shadow-md'>
                        {`
#include <iostream>
using namespace std;

class Complex {
public:
    int real, imag;

    Complex(int r, int i) : real(r), imag(i) {}

    // Operator Overloading
    Complex operator + (Complex const &other) {
        return Complex(real + other.real, imag + other.imag);
    }

    void display() {
        cout << real << " + " << imag << "i" << endl;
    }
};

int main() {
    Complex c1(3, 4), c2(1, 2);
    Complex c3 = c1 + c2; // Calls the overloaded operator +
    c3.display(); // Displays 4 + 6i

    return 0;
}
        `}
                    </SyntaxHighlighter>

                    <p>In this example, the `+` operator is overloaded to add two `Complex` numbers, creating a new `Complex` object.</p>

                    <h4 className="mt-4 text-lg font-semibold">2. Run-Time Polymorphism:</h4>

                    <p>Run-time polymorphism is achieved through <strong>inheritance</strong> and <strong>virtual functions</strong>. It allows a base class reference or pointer to call derived class methods.</p>

                    <SyntaxHighlighter language="cpp" style={dracula} className='rounded-md shadow-md'>
                        {`
#include <iostream>
using namespace std;

class Animal {
public:
    // Virtual function
    virtual void sound() {
        cout << "Animal makes a sound." << endl;
    }
};

class Dog : public Animal {
public:
    void sound() override {  // Overriding the base class function
        cout << "Dog barks." << endl;
    }
};

class Cat : public Animal {
public:
    void sound() override {
        cout << "Cat meows." << endl;
    }
};

int main() {
    Animal* animal1 = new Dog();
    Animal* animal2 = new Cat();

    animal1->sound();  // Dog barks
    animal2->sound();  // Cat meows

    delete animal1;
    delete animal2;

    return 0;
}
        `}
                    </SyntaxHighlighter>

                    <p>In the above code, the function `sound()` is a virtual function in the base class `Animal`. At runtime, the correct method is called based on the object type (`Dog` or `Cat`), demonstrating run-time polymorphism.</p>

                    <h4 className="mt-4 text-lg font-semibold">Summary:</h4>
                    <ul className="list-disc ml-6">
                        <li><strong>Compile-Time Polymorphism:</strong> Achieved through function overloading and operator overloading.</li>
                        <li><strong>Run-Time Polymorphism:</strong> Achieved through inheritance and virtual functions, where a base class reference or pointer calls derived class methods at runtime.</li>
                    </ul>
                    <h3 className='mt-4 font-semibold text-xl'>Inheritance</h3>
                    <p>Inheritance is the process by which one class acquires the properties and methods of another class. It helps to reuse the code and establish a relationship between different classes.</p>

                    <ul className='list-disc ml-6'>
                        <li>
                            <p><span className='font-bold '>Single Inheritence : </span> Single inheritance occurs when a child class inherits from a single parent class.</p>
                            <SyntaxHighlighter language='cpp' style={dracula}  >
                                {`#include <iostream>
using namespace std;

// Parent class
class Animal {
public:
    void eat() {
        cout << "Animal is eating." << endl;
    }
};

// Child class inheriting from Animal
class Dog : public Animal {
public:
    void bark() {
        cout << "Dog is barking." << endl;
    }
};

int main() {
    Dog myDog;
    myDog.eat();  // Inherited from Animal
    myDog.bark(); // Own method
    return 0;
}
`}

                            </SyntaxHighlighter>
                            <h3 className='text-xl font-semibold'>Output</h3>
                            <SyntaxHighlighter language='text' style={dracula} className='rounded-md shadow-md'>
                                {`Animal is eating.
Dog is barking.`}
                            </SyntaxHighlighter>
                        </li>
                        <li>
                            <p><span className='font-bold'>Multiple Inheritence : </span>
                                A child class inherits from multiple parent classes.</p>
                            <SyntaxHighlighter language='cpp' style={dracula}>
                                {`#include <iostream>
using namespace std;

// Parent class 1
class Engine {
public:
    void startEngine() {
        cout << "Engine started." << endl;
    }
};

// Parent class 2
class Wheels {
public:
    void rotateWheels() {
        cout << "Wheels are rotating." << endl;
    }
};

// Child class inheriting from both Engine and Wheels
class Car : public Engine, public Wheels {
public:
    void drive() {
        cout << "Car is driving." << endl;
    }
};

int main() {
    Car myCar;
    myCar.startEngine();  // Inherited from Engine
    myCar.rotateWheels(); // Inherited from Wheels
    myCar.drive();        // Own method
    return 0;
}
`}
                            </SyntaxHighlighter>
                            <h3 className='font-semibold text-xl'>Output</h3>
                            <SyntaxHighlighter language='text' style={dracula} className='rounded-md shadow-md'>
                                {`Engine started.
Wheels are rotating.
Car is driving.
`}
                            </SyntaxHighlighter>
                        </li>
                        <li>
                            <p><span>Multiple Inheritence : </span>
                                A derived class inherits from another derived class (grandparent → parent → child).
                            </p>

                            <SyntaxHighlighter language='cpp' style={dracula}>
                                {`#include <iostream>
using namespace std;

// Grandparent class
class LivingBeing {
public:
    void breathe() {
        cout << "Living being is breathing." << endl;
    }
};

// Parent class inheriting from LivingBeing
class Animal : public LivingBeing {
public:
    void eat() {
        cout << "Animal is eating." << endl;
    }
};

// Child class inheriting from Animal
class Dog : public Animal {
public:
    void bark() {
        cout << "Dog is barking." << endl;
    }
};

int main() {
    Dog myDog;
    myDog.breathe(); // From LivingBeing
    myDog.eat();     // From Animal
    myDog.bark();    // Own method
    return 0;
}
`}
                            </SyntaxHighlighter>

                            <h3 className='font-semibold text-xl'>Output</h3>
                            <SyntaxHighlighter language='text' className='rounded-md shadow-md' style={dracula}>
                                {`Living being is breathing.
Animal is eating.
Dog is barking.
`}
                            </SyntaxHighlighter>
                        </li>
                        <li>
                            <p><span>Hierherical Inheritence : </span>  Multiple child classes inherit from a single parent class.</p>
                            <SyntaxHighlighter language='cpp' style={dracula} className='shadow-md rounded-md'>
                                {`#include <iostream>
using namespace std;

// Parent class
class Animal {
public:
    void sleep() {
        cout << "Animal is sleeping." << endl;
    }
};

// Child class 1 inheriting from Animal
class Dog : public Animal {
public:
    void bark() {
        cout << "Dog is barking." << endl;
    }
};

// Child class 2 inheriting from Animal
class Cat : public Animal {
public:
    void meow() {
        cout << "Cat is meowing." << endl;
    }
};

int main() {
    Dog myDog;
    Cat myCat;

    myDog.sleep(); // Inherited from Animal
    myDog.bark();  // Own method

    myCat.sleep(); // Inherited from Animal
    myCat.meow();  // Own method

    return 0;
}
`}
                            </SyntaxHighlighter>

                            <h3 className='font-semibold text-xl'>Output</h3>
                            <SyntaxHighlighter language='text' style={dracula} className='rounded-md shadow-md'>
                                {`Animal is sleeping.
Dog is barking.
Animal is sleeping.
Cat is meowing.
`}
                            </SyntaxHighlighter>


                        </li>
                        <li>
                            <p><span>  Hybrid Inheritence : </span> A mix of multiple and multilevel inheritance.</p>
                            <SyntaxHighlighter language='cpp' style={dracula} className='shadow-md rounded-md'>
                                {`#include <iostream>
using namespace std;

// Base class 1
class Engine {
public:
    void startEngine() {
        cout << "Engine started." << endl;
    }
};

// Base class 2
class Wheels {
public:
    void rotateWheels() {
        cout << "Wheels are rotating." << endl;
    }
};

// Intermediate class (inherits from Engine)
class Vehicle : public Engine {
public:
    void honk() {
        cout << "Vehicle is honking." << endl;
    }
};

// Final child class inheriting from both Vehicle and Wheels
class Car : public Vehicle, public Wheels {
public:
    void drive() {
        cout << "Car is driving." << endl;
    }
};

int main() {
    Car myCar;
    myCar.startEngine();  // Inherited from Vehicle -> Engine
    myCar.rotateWheels(); // Inherited from Wheels
    myCar.honk();         // Inherited from Vehicle
    myCar.drive();        // Own method

    return 0;
}
`}
                            </SyntaxHighlighter>
                            <h3 className='text-semibold text-xl'>Output</h3>
                            <SyntaxHighlighter language='text' style={dracula} className='shadow-md rounded-md'>
                                {`Engine started.
Wheels are rotating.
Vehicle is honking.
Car is driving.`}
                            </SyntaxHighlighter>
                        </li>
                    </ul>

                    {/* shadcn table  */}
                    <div className="w-full max-w-4xl mx-auto mt-6">
                        <h3 className='font-bold text-xl text-center mb-4'>Summary of Inheritance Types </h3>
                        <Table>


                            {/* Table Header */}
                            <TableHeader>
                                <TableRow className="bg-gray-200 dark:bg-gray-700">
                                    <TableHead className="text-left px-4 py-2">Inheritance Type</TableHead>
                                    <TableHead className="text-left px-4 py-2">Description</TableHead>
                                    <TableHead className="text-left px-4 py-2">Example</TableHead>
                                </TableRow>
                            </TableHeader>

                            {/* Table Body */}
                            <TableBody>
                                <TableRow className="odd:bg-white even:bg-gray-100 dark:odd:bg-gray-800 dark:even:bg-gray-700">
                                    <TableCell className="font-semibold">Single Inheritance</TableCell>
                                    <TableCell>One class inherits from another</TableCell>
                                    <TableCell><span className="font-medium">Dog</span> inherits from <span className="font-medium">Animal</span></TableCell>
                                </TableRow>

                                <TableRow className="odd:bg-white even:bg-gray-100 dark:odd:bg-gray-800 dark:even:bg-gray-700 ">
                                    <TableCell className="font-semibold">Multiple Inheritance</TableCell>
                                    <TableCell>A class inherits from multiple classes</TableCell>
                                    <TableCell><span className="font-medium">Car</span> inherits from <span className="font-medium">Engine</span> and <span className="font-medium">Wheels</span></TableCell>
                                </TableRow>

                                <TableRow className="odd:bg-white even:bg-gray-100 dark:odd:bg-gray-800 dark:even:bg-gray-700">
                                    <TableCell className="font-semibold">Multilevel Inheritance</TableCell>
                                    <TableCell>A class inherits from another derived class</TableCell>
                                    <TableCell><span className="font-medium">Dog</span> inherits from <span className="font-medium">Animal</span>, which inherits from <span className="font-medium">LivingBeing</span></TableCell>
                                </TableRow>

                                <TableRow className="odd:bg-white even:bg-gray-100 dark:odd:bg-gray-800 dark:even:bg-gray-700">
                                    <TableCell className="font-semibold">Hierarchical Inheritance</TableCell>
                                    <TableCell>Multiple child classes inherit from a single parent class</TableCell>
                                    <TableCell><span className="font-medium">Dog</span> and <span className="font-medium">Cat</span> inherit from <span className="font-medium">Animal</span></TableCell>
                                </TableRow>

                                <TableRow className="odd:bg-white even:bg-gray-100 dark:odd:bg-gray-800 dark:even:bg-gray-700">
                                    <TableCell className="font-semibold">Hybrid Inheritance</TableCell>
                                    <TableCell>Combination of multiple and multilevel inheritance</TableCell>
                                    <TableCell><span className="font-medium">Car</span> inherits from <span className="font-medium">Vehicle</span> (which inherits from <span className="font-medium">Engine</span>) and also from <span className="font-medium">Wheels</span></TableCell>
                                </TableRow>
                            </TableBody>
                        </Table>
                    </div>

                    <h3 className='mt-4 font-semibold text-xl'>Inheritance</h3>
                    <p>Encapsulation is the process of wrapping data (variables) and code acting on the data (methods) into a single unit called a class. It helps to protect the data from unauthorized access.</p>

                    <div className="max-w-4xl mx-auto px-4 md:px-6 py-6">
                        {/* Friend Functions Section */}
                        <div className="mb-10">
                            <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm">
                                <h3 className='mt-4 font-semibold text-2xl mb-6 text-gray-800 dark:text-gray-100'>
                                    Friend Function and Friend Class
                                </h3>

                                <div className="mb-8">
                                    <h3 className='mb-4'>
                                        <span className='font-bold text-lg text-gray-800 dark:text-gray-200'>Friend Function:</span>
                                        <p className='text-gray-700 dark:text-gray-300 mt-2 leading-relaxed'>
                                            A friend function is a non-member function that is granted access to private and protected members of a class
                                            by using the friend keyword inside the class definition.
                                        </p>
                                    </h3>

                                    <h4 className='font-bold text-lg mt-6 mb-3 text-gray-800 dark:text-gray-200'>
                                        Characteristics of Friend Functions
                                    </h4>
                                    <ul className='list-disc ml-6 space-y-2 mb-6'>
                                        <li className='text-gray-700 dark:text-gray-300'>Declared inside the class with the friend keyword</li>
                                        <li className='text-gray-700 dark:text-gray-300'>Not a member of the class but has access to its private/protected members</li>
                                        <li className='text-gray-700 dark:text-gray-300'>Can be a global function or a member of another class</li>
                                    </ul>

                                    <h4 className='font-semibold text-lg mb-3 text-gray-800 dark:text-gray-200'>Example</h4>
                                    <div className="my-6 overflow-x-auto">
                                        <SyntaxHighlighter
                                            className='rounded-md shadow-md p-4 text-sm md:text-base'
                                            style={dracula}
                                            language='cpp'
                                        >
                                            {`/* Your code example here */`}
                                        </SyntaxHighlighter>
                                    </div>

                                    <h4 className='font-semibold text-lg mb-3 text-gray-800 dark:text-gray-200'>Output</h4>
                                    <div className="my-6 overflow-x-auto">
                                        <SyntaxHighlighter
                                            className='rounded-md shadow-md p-4 text-sm md:text-base'
                                            style={dracula}
                                            language='text'
                                        >
                                            {`Width of the box: 10`}
                                        </SyntaxHighlighter>
                                    </div>
                                </div>

                                {/* Friend Class Section */}
                                <div className="mt-10">
                                    <h3 className='font-semibold text-xl mb-4 text-gray-800 dark:text-gray-100'>Friend Class</h3>
                                    <p className='text-gray-700 dark:text-gray-300 mb-4 leading-relaxed'>
                                        A friend class is a class that is given access to private and protected members of another class
                                        using the friend keyword.
                                    </p>

                                    <h4 className='font-semibold text-lg mt-6 mb-3 text-gray-800 dark:text-gray-200'>
                                        Characteristics of Friend Classes
                                    </h4>
                                    <ul className='list-disc ml-6 space-y-2 mb-6'>
                                        <li className='text-gray-700 dark:text-gray-300'>Declared inside the class with the friend keyword</li>
                                        <li className='text-gray-700 dark:text-gray-300'>Can access all private and protected members of the original class</li>
                                        <li className='text-gray-700 dark:text-gray-300'>Useful for tightly coupled classes</li>
                                    </ul>

                                    <div className="my-6 overflow-x-auto">
                                        <SyntaxHighlighter
                                            className='rounded-md shadow-md p-4 text-sm md:text-base'
                                            style={dracula}
                                            language='cpp'
                                        >
                                            {`/* Your code example here */`}
                                        </SyntaxHighlighter>
                                    </div>

                                    <h4 className='font-semibold text-lg mb-3 text-gray-800 dark:text-gray-200'>Output</h4>
                                    <div className="my-6 overflow-x-auto">
                                        <SyntaxHighlighter
                                            className='rounded-md shadow-md p-4 text-sm md:text-base'
                                            style={dracula}
                                            language='text'
                                        >
                                            {`Car engine power: 200 HP`}
                                        </SyntaxHighlighter>
                                    </div>
                                </div>

                                {/* Comparison Table */}
                                <div className="mt-10 overflow-x-auto">
                                    <h3 className='font-bold text-xl text-center mb-6 text-gray-800 dark:text-gray-100'>
                                        Key Differences Between Friend Function and Friend Class
                                    </h3>
                                    <Table className="min-w-[600px]">
                                        <TableHeader>
                                            <TableRow className="bg-gray-100 dark:bg-gray-700">
                                                <TableHead className="px-4 py-3 text-left font-semibold text-gray-800 dark:text-gray-200">Feature</TableHead>
                                                <TableHead className="px-4 py-3 text-left font-semibold text-gray-800 dark:text-gray-200">Friend Function</TableHead>
                                                <TableHead className="px-4 py-3 text-left font-semibold text-gray-800 dark:text-gray-200">Friend Class</TableHead>
                                            </TableRow>
                                        </TableHeader>
                                        <TableBody>
                                            <TableRow className="border-b border-gray-200 dark:border-gray-700">
                                                <TableCell className="px-4 py-3 font-medium text-gray-800 dark:text-gray-200">Access to private/protected members</TableCell>
                                                <TableCell className="px-4 py-3">Yes</TableCell>
                                                <TableCell className="px-4 py-3">Yes</TableCell>
                                            </TableRow>
                                            {/* Other rows */}
                                            <TableRow className="border-b border-gray-200 dark:border-gray-700">
                                                <TableCell className="px-4 py-3 font-medium text-gray-800 dark:text-gray-200">Declaration</TableCell>
                                                <TableCell className="px-4 py-3">
                                                    <div className="rounded bg-gray-100 dark:bg-gray-700 p-2">
                                                        <code className="text-sm">friend void func(ClassName);</code>
                                                    </div>
                                                </TableCell>
                                                <TableCell className="px-4 py-3">
                                                    <div className="rounded bg-gray-100 dark:bg-gray-700 p-2">
                                                        <code className="text-sm">friend class ClassName;</code>
                                                    </div>
                                                </TableCell>
                                            </TableRow>
                                        </TableBody>
                                    </Table>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="max-w-4xl mx-auto px-4 md:px-6 py-6">
      <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm">
        <h3 className="font-bold text-2xl mb-6 text-gray-800 dark:text-gray-100">Access Modifier</h3>
        <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-8">
          Access modifiers in C++ define the visibility and accessibility of class members (variables and methods).
          They control how class members are accessed inside or outside the class.
        </p>

        {/* Private Access Modifier */}
        <h3 className="font-semibold text-xl mb-4 text-gray-800 dark:text-gray-100">1. Private Access Modifier</h3>
        <ul className="list-disc ml-6 space-y-2 mb-6">
          <li className="text-gray-700 dark:text-gray-300">Members declared as private can only be accessed within the same class.</li>
          <li className="text-gray-700 dark:text-gray-300">They cannot be accessed outside the class, even by derived classes.</li>
        </ul>

        <h4 className="font-semibold text-lg mb-3 text-gray-800 dark:text-gray-100">Example</h4>
        <SyntaxHighlighter className="rounded-md shadow-md p-4 text-sm" style={dracula} language="cpp">
          {`#include <iostream>
using namespace std;

class Car {
private:
    string model;  // Private member

public:
    void setModel(string m) { model = m; }
    string getModel() { return model; }
};

int main() {
    Car myCar;
    myCar.setModel("Tesla Model X");
    cout << "Car Model: " << myCar.getModel() << endl;
    return 0;
}`}
        </SyntaxHighlighter>

        <h4 className="font-semibold text-lg mb-3 text-gray-800 dark:text-gray-100">Output</h4>
        <SyntaxHighlighter className="rounded-md shadow-md p-4 text-sm" style={dracula} language="text">
          {`Car Model: Tesla Model X`}
        </SyntaxHighlighter>

        {/* Public Access Modifier */}
        <h3 className="font-semibold text-xl mt-10 mb-4 text-gray-800 dark:text-gray-100">2. Public Access Modifier</h3>
        <ul className="list-disc ml-6 space-y-2 mb-6">
          <li className="text-gray-700 dark:text-gray-300">Members declared as public can be accessed from anywhere.</li>
          <li className="text-gray-700 dark:text-gray-300">There are no restrictions on access.</li>
        </ul>

        <h4 className="font-semibold text-lg mb-3 text-gray-800 dark:text-gray-100">Example</h4>
        <SyntaxHighlighter className="rounded-md shadow-md p-4 text-sm" style={dracula} language="cpp">
          {`#include <iostream>
using namespace std;

class Car {
public:
    string brand;
};

int main() {
    Car myCar;
    myCar.brand = "BMW";  
    cout << "Car Brand: " << myCar.brand << endl;
    return 0;
}`}
        </SyntaxHighlighter>

        <h4 className="font-semibold text-lg mb-3 text-gray-800 dark:text-gray-100">Output</h4>
        <SyntaxHighlighter className="rounded-md shadow-md p-4 text-sm" style={dracula} language="text">
          {`Car Brand: BMW`}
        </SyntaxHighlighter>

        {/* Protected Access Modifier */}
        <h3 className="font-semibold text-xl mt-10 mb-4 text-gray-800 dark:text-gray-100">3. Protected Access Modifier</h3>
        <ul className="list-disc ml-6 space-y-2 mb-6">
          <li className="text-gray-700 dark:text-gray-300">Members declared as protected behave like private members but can be accessed in derived (child) classes.</li>
          <li className="text-gray-700 dark:text-gray-300">Cannot be accessed directly from outside the class.</li>
        </ul>

        <h4 className="font-semibold text-lg mb-3 text-gray-800 dark:text-gray-100">Example</h4>
        <SyntaxHighlighter className="rounded-md shadow-md p-4 text-sm" style={dracula} language="cpp">
          {`#include <iostream>
using namespace std;

class Parent {
protected:
    int age;
};

class Child : public Parent {
public:
    void setAge(int a) { age = a; }
    void showAge() { cout << "Age: " << age << endl; }
};

int main() {
    Child obj;
    obj.setAge(25);
    obj.showAge();
    return 0;
}`}
        </SyntaxHighlighter>

        <h4 className="font-semibold text-lg mb-3 text-gray-800 dark:text-gray-100">Output</h4>
        <SyntaxHighlighter className="rounded-md shadow-md p-4 text-sm" style={dracula} language="text">
          {`Age: 25`}
        </SyntaxHighlighter>

        {/* Comparison Table */}
        <div className="mt-10">
          <h3 className="font-bold text-lg mb-4 text-center text-gray-800 dark:text-gray-100">
            Access Modifier Comparison Table
          </h3>
          <Table className="min-w-full">
            <TableHeader>
              <TableRow className="bg-gray-100 dark:bg-gray-700">
                <TableHead className="px-4 py-3 text-left font-semibold text-gray-800 dark:text-gray-200">Modifier</TableHead>
                <TableHead className="px-4 py-3 text-left font-semibold text-gray-800 dark:text-gray-200">Within Class</TableHead>
                <TableHead className="px-4 py-3 text-left font-semibold text-gray-800 dark:text-gray-200">Derived Class</TableHead>
                <TableHead className="px-4 py-3 text-left font-semibold text-gray-800 dark:text-gray-200">Outside Class</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow className="border-b border-gray-200 dark:border-gray-700">
                <TableCell className="px-4 py-3 font-medium text-gray-800 dark:text-gray-200">private</TableCell>
                <TableCell className="px-4 py-3">✅ Yes</TableCell>
                <TableCell className="px-4 py-3">❌ No</TableCell>
                <TableCell className="px-4 py-3">❌ No</TableCell>
              </TableRow>
              <TableRow className="border-b border-gray-200 dark:border-gray-700">
                <TableCell className="px-4 py-3 font-medium text-gray-800 dark:text-gray-200">public</TableCell>
                <TableCell className="px-4 py-3">✅ Yes</TableCell>
                <TableCell className="px-4 py-3">✅ Yes</TableCell>
                <TableCell className="px-4 py-3">✅ Yes</TableCell>
              </TableRow>
              <TableRow className="border-b border-gray-200 dark:border-gray-700">
                <TableCell className="px-4 py-3 font-medium text-gray-800 dark:text-gray-200">protected</TableCell>
                <TableCell className="px-4 py-3">✅ Yes</TableCell>
                <TableCell className="px-4 py-3">✅ Yes</TableCell>
                <TableCell className="px-4 py-3">❌ No</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </div>
      </div>


                    </div>
                </div>
            </main >
        </div >
    );
};

export default OOPS;
