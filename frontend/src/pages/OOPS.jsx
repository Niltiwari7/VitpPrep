import React, { useState } from 'react';
import { AiOutlineArrowLeft, AiOutlineBars } from 'react-icons/ai';
import { useDispatch, useSelector } from 'react-redux';
import { setDarkMode } from '../utils/slices/theme.slice';
import { FaBars, FaMoon, FaSun } from 'react-icons/fa';
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
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    // Toggle Sidebar Function
    const toggleSidebar = () => {
        setIsSidebarOpen(!isSidebarOpen);
    };

    const toggleTheme = () => {
        dispatch(setDarkMode(!darkMode));
    };



    return (
        <div className='gap-5'>

            <header className="w-full flex items-center justify-between px-6 py-4 bg-white dark:bg-gray-800 shadow-md fixed top-0 left-0 right-0 z-10">
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

            <div className="flex min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-800 dark:text-gray-100">


                <div className={`bg-white dark:bg-gray-900 mt-[60px] p-6 w-[60%] sm:w-[20%] fixed min-h-screen shadow-lg rounded-lg 
                 dark:text-white text-black transition-all duration-300 ease-in-out 
                 ${isSidebarOpen ? "block" : "hidden sm:block"}`}>
                    <h3 className="text-center text-lg font-semibold pb-4 border-b border-gray-300 dark:border-gray-700">Content</h3>

                    <div className="flex flex-col gap-2 mt-4">
                        <a href="#oops_desc" onClick={toggleSidebar} className="block px-4 py-2 rounded-md text-gray-700 dark:text-gray-300 hover:bg-blue-500 hover:text-white transition duration-300">OOPS Introduction</a>
                        <a href="#Constructor" onClick={toggleSidebar} className="block px-4 py-2 rounded-md text-gray-700 dark:text-gray-300 hover:bg-red-500 hover:text-white transition duration-300">Constructor</a>
                        <a href="#Destructor" onClick={toggleSidebar} className="block px-4 py-2 rounded-md text-gray-700 dark:text-gray-300 hover:bg-green-500 hover:text-white transition duration-300">Destructor</a>
                        <a href="#Four Pillars of OOPS" onClick={toggleSidebar} className="block px-4 py-2 rounded-md text-gray-700 dark:text-gray-300 hover:bg-yellow-500 hover:text-black transition duration-300">Four Pillars of OOPS</a>
                        <a href="#Abstraction" onClick={toggleSidebar} className="block px-4 py-2 rounded-md text-gray-700 dark:text-gray-300 hover:bg-purple-500 hover:text-white transition duration-300">Abstraction</a>
                        <a href="#Polymorphism" onClick={toggleSidebar} className="block px-4 py-2 rounded-md text-gray-700 dark:text-gray-300 hover:bg-pink-500 hover:text-white transition duration-300">Polymorphism</a>
                        <a href="#Inheritance" onClick={toggleSidebar} className="block px-4 py-2 rounded-md text-gray-700 dark:text-gray-300 hover:bg-orange-500 hover:text-white transition duration-300">Inheritance</a>
                        <a href="#Encapsulation" onClick={toggleSidebar} className="block px-4 py-2 rounded-md text-gray-700 dark:text-gray-300 hover:bg-teal-500 hover:text-white transition duration-300">Encapsulation</a>
                        <a href="#Friend Function and Friend Class" onClick={toggleSidebar} className="block px-4 py-2 rounded-md text-gray-700 dark:text-gray-300 hover:bg-indigo-500 hover:text-white transition duration-300">Friend Function and Friend Class</a>
                        <a href="#Access Modifier" onClick={toggleSidebar} className="block px-4 py-2 rounded-md text-gray-700 dark:text-gray-300 hover:bg-gray-500 hover:text-white transition duration-300">Access Modifier</a>
                    </div>
                </div>

                {/* Toggle Sidebar Button for Mobile */}
                <button
                    onClick={toggleSidebar}
                    className="sm:hidden fixed top-16 right-4 bg-blue-600 dark:bg-yellow-500 text-white p-2 rounded-full shadow-md z-20">
                    <AiOutlineBars size={24} />
                </button>
                <main className="sm:w-4/5 w-full ml-auto p-6 mt-20">


                    <div id='oops_desc' className="w-full sm:w-4/5 mx-auto">
                        <div className="max-w-4xl mx-auto px-4 md:px-6 py-6">
                            <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-lg">

                                {/* Title */}
                                <h1 className="text-center text-3xl font-bold text-blue-600 dark:text-yellow-500">
                                    Object-Oriented Programming
                                </h1>

                                <p className="mt-2 text-lg text-gray-700 dark:text-gray-300 leading-relaxed">
                                    OOP stands for <span className="font-bold text-gray-900 dark:text-white">Object-Oriented Programming</span>.
                                    It helps solve real-world problems using classes and objects.
                                </p>



                                {/* Class Section */}
                                <h2 className="mt-6 text-xl font-semibold text-gray-800 dark:text-gray-100">
                                    Class
                                </h2>
                                <p className="mt-2 text-gray-700 dark:text-gray-300">
                                    A <span className="font-bold text-gray-900 dark:text-white">class</span> is a user-defined data type with its own member functions and variables.
                                    It acts as a blueprint for creating objects.
                                </p>

                                {/* Class Example */}
                                <h3 className="mt-3 text-lg font-semibold text-gray-800 dark:text-gray-100">
                                    Example:
                                </h3>


                                <div className="mt-3 rounded-lg shadow-md overflow-hidden">
                                    <SyntaxHighlighter language="cpp" style={dracula} className="rounded-md">
                                        {`class Student {
public:
    string name;
    int age;
};`}
                                    </SyntaxHighlighter>
                                </div>

                                {/* Object Section */}
                                <h2 className="mt-6 text-xl font-semibold text-gray-800 dark:text-gray-100">
                                    Object
                                </h2>
                                <p className="mt-2 text-gray-700 dark:text-gray-300">
                                    An <span className="font-bold text-gray-900 dark:text-white">object</span> is an instance of a class.
                                    It can access the properties and methods of the class.
                                </p>

                                {/* Object Example */}
                                <h3 className="mt-3 text-lg font-semibold text-gray-800 dark:text-gray-100">
                                    Example:
                                </h3>
                                <div className="mt-3 rounded-lg shadow-md overflow-hidden">
                                    <SyntaxHighlighter language="cpp" style={dracula} className="rounded-md">
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
                                </div>

                                {/* Output Section */}
                                <h3 className="mt-6 text-lg font-semibold text-gray-800 dark:text-gray-100">
                                    Output:
                                </h3>
                                <div className="mt-3 rounded-lg shadow-md overflow-hidden">
                                    <SyntaxHighlighter language="text" style={dracula} className="rounded-md">
                                        {`The student name is John
The student age is 20`}
                                    </SyntaxHighlighter>
                                </div>

                            </div>
                        </div>

                        <div className="max-w-4xl mx-auto px-4 md:px-6 py-6" id='Constructor'>
                            <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-lg">
                                <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-100">
                                    Constructor in C++
                                </h2>

                                <p className="mt-3 text-gray-700 dark:text-gray-300 leading-relaxed">
                                    A <span className="font-bold text-gray-900 dark:text-white">constructor</span> is a special method that does not return anything.
                                    It is automatically invoked when an object is created.
                                </p>

                                <h2 className="mt-5 text-xl font-semibold text-gray-800 dark:text-gray-100">
                                    Types of Constructors:
                                </h2>
                                <ul className="list-disc ml-6 mt-2 space-y-2 text-gray-700 dark:text-gray-300">
                                    <li><strong>Default Constructor:</strong> A constructor with no parameters.</li>
                                    <li><strong>Parameterized Constructor:</strong> A constructor that takes arguments.</li>
                                    <li><strong>Copy Constructor:</strong> A constructor that initializes an object using another object.</li>
                                </ul>

                                <h2 className="mt-5 text-xl font-semibold text-gray-800 dark:text-gray-100">
                                    Characteristics of Constructors:
                                </h2>
                                <ul className="list-disc ml-6 mt-2 space-y-2 text-gray-700 dark:text-gray-300">
                                    <li>Constructor does not return anything.</li>
                                    <li>Constructor name is the same as the class name.</li>
                                    <li>Constructor cannot be private unless used in a Singleton pattern.</li>
                                    <li>C++ allows constructor overloading with different parameters.</li>
                                    <li>Automatically called when an object is created.</li>
                                    <li>Has no return type, not even <code className="bg-gray-200 dark:bg-gray-700 px-1 rounded-md">void</code>.</li>
                                    <li>A default constructor is called if no constructor is explicitly defined.</li>
                                </ul>

                                <h3 className="mt-6 text-lg font-semibold text-gray-800 dark:text-gray-100">
                                    Example:
                                </h3>

                                <div className="mt-3 rounded-lg shadow-md overflow-hidden">
                                    <SyntaxHighlighter language="cpp" style={dracula} className="rounded-md">
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
    Student s; // Default Constructor
    Student s1("John", 20); // Parameterized Constructor
    s1.display();
    Student s2(s1); // Copy Constructor
    s2.display();
    return 0;
}`}
                                    </SyntaxHighlighter>
                                </div>

                                <h3 className="mt-6 text-lg font-semibold text-gray-800 dark:text-gray-100">
                                    Output:
                                </h3>

                                <div className="mt-3 rounded-lg shadow-md overflow-hidden">
                                    <SyntaxHighlighter language="text" style={dracula} className="rounded-md">
                                        {`Default Constructor

Parameterized Constructor
The student name is John
The student age is 20

Copy Constructor
The student name is John
The student age is 20`}
                                    </SyntaxHighlighter>
                                </div>
                            </div>
                        </div>


                        <div className="max-w-4xl mx-auto px-4 md:px-6 py-6" id='Destructor'>
                            <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-lg">
                                <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-100">
                                    Destructor in C++
                                </h2>

                                <p className="mt-3 text-gray-700 dark:text-gray-300 leading-relaxed">
                                    A <span className="font-bold text-gray-900 dark:text-white"> destructor </span> in C++ is a special member function that is called automatically
                                    when an object goes out of scope or is explicitly deleted. It is used to release resources allocated to the object.
                                </p>

                                <h3 className="mt-4 text-lg font-semibold text-gray-800 dark:text-gray-100">
                                    Characteristics of Destructor:
                                </h3>

                                <ul className="list-disc ml-6 mt-2 space-y-2 text-gray-700 dark:text-gray-300">
                                    <li><code className="bg-gray-200 dark:bg-gray-700 px-1 rounded-md">~MyClass</code> is the naming convention for a destructor.</li>
                                    <li>It does not return a value and does not take any arguments.</li>
                                    <li>Called automatically when an object goes out of scope or is deleted.</li>
                                    <li>Used to clean up resources like memory, file handles, or system resources.</li>
                                    <li>A class can have only <strong>one destructor</strong> (cannot be overloaded).</li>
                                    <li>Destructors are called in <strong>reverse order</strong> of object construction.</li>
                                </ul>

                                <h3 className="mt-6 text-lg font-semibold text-gray-800 dark:text-gray-100">
                                    Example:
                                </h3>

                                <div className="mt-3 rounded-lg shadow-md overflow-hidden">
                                    <SyntaxHighlighter language="cpp" style={dracula} className="rounded-md">
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
}`}
                                    </SyntaxHighlighter>
                                </div>

                                <h3 className="mt-6 text-lg font-semibold text-gray-800 dark:text-gray-100">
                                    Output:
                                </h3>

                                <div className="mt-3 rounded-lg shadow-md overflow-hidden">
                                    <SyntaxHighlighter language="text" style={dracula} className="rounded-md">
                                        {`Constructor called!
x: 10, y: 20
Destructor called!`}
                                    </SyntaxHighlighter>
                                </div>
                            </div>
                        </div>

                        <div className="max-w-4xl mx-auto px-4 md:px-6 py-6">
                            <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-lg" id='Four Pillars of OOPS'>
                                <h2 className="mt-4 font-semibold text-2xl text-gray-800 dark:text-gray-100">
                                    Four Pillars of OOPS
                                </h2>

                                <ul className="list-disc ml-6 mt-3 space-y-2 text-gray-700 dark:text-gray-300">
                                    <li><strong>Abstraction</strong></li>
                                    <li><strong>Polymorphism</strong></li>
                                    <li><strong>Inheritance</strong></li>
                                    <li><strong>Encapsulation</strong></li>
                                </ul>

                                <p className="mt-4 text-gray-700 dark:text-gray-300">
                                    <span className="font-semibold text-gray-800 dark:text-gray-100">Note:</span> The best way to remember this is with the acronym <span className="font-semibold text-indigo-600 dark:text-indigo-400">APIE</span>.
                                </p>
                            </div>
                        </div>


                        <div className="max-w-4xl mx-auto px-4 md:px-6 py-6" id='Abstraction'>
                            <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-lg">
                                <h3 className="mt-4 font-semibold text-2xl text-gray-800 dark:text-gray-100">
                                    Abstraction
                                </h3>
                                <p className="text-gray-700 dark:text-gray-300 mt-2 leading-relaxed">
                                    Abstraction is the process of hiding the implementation details and showing only the functionality to the user.
                                    It helps to reduce programming complexity and effort.
                                </p>

                                <h4 className="mt-6 text-lg font-semibold text-gray-800 dark:text-gray-100">
                                    Example to Understand Abstraction:
                                </h4>
                                <p className="text-gray-700 dark:text-gray-300 mt-2 leading-relaxed">
                                    Imagine driving a car. You only need to know how to use the steering wheel, accelerator, and brakes to control the car.
                                    You don’t need to understand how the engine works or how the fuel system operates.
                                </p>
                                <p className="text-gray-700 dark:text-gray-300 mt-2 leading-relaxed">
                                    In this analogy, the car’s complex system is abstracted from you, and you interact only with the necessary controls.
                                </p>

                                <h4 className="mt-6 text-lg font-semibold text-gray-800 dark:text-gray-100">
                                    Code Example in C++:
                                </h4>


                                <SyntaxHighlighter language="cpp" style={dracula} className="rounded-md shadow-md">
                                    {`#include <iostream>
using namespace std;

class Car {
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
}`}
                                </SyntaxHighlighter>


                                <p className="text-gray-700 dark:text-gray-300 mt-4 leading-relaxed">
                                    In the above code:
                                </p>
                                <ul className="list-disc ml-6 space-y-2 text-gray-700 dark:text-gray-300">
                                    <li><strong>Abstract class (Car)</strong>: Defines the common interface for all cars (e.g., `drive()` method) but doesn't provide the actual implementation.</li>
                                    <li><strong>Concrete class (Tesla)</strong>: Implements the `drive()` method, making the car functional.</li>
                                </ul>

                                <p className="text-gray-700 dark:text-gray-300 mt-2 leading-relaxed">
                                    The user of the car (in this case, the `Tesla` class) only interacts with the abstract `drive()` method without knowing the internal details.
                                </p>

                                <h3 className="mt-6 text-lg font-semibold text-gray-800 dark:text-gray-100">
                                    Output
                                </h3>

                                <SyntaxHighlighter language="text" className="rounded-md shadow-md" style={dracula}>
                                    {`Driving a Tesla... the car accelerates smoothly!
The car has stopped.`}
                                </SyntaxHighlighter>

                            </div>
                        </div>


                        <div className="max-w-4xl mx-auto px-6 py-8" id='Polymorphism'>
                            <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm">
                                <h3 className="text-3xl font-bold mb-6 text-gray-900 dark:text-gray-100">
                                    Polymorphism
                                </h3>
                                <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                                    Polymorphism is the ability of an object to take many forms. It allows
                                    objects of different classes to be treated as objects of a common
                                    superclass.
                                </p>

                                <h4 className="mt-6 text-xl font-semibold text-gray-800 dark:text-gray-200">
                                    Polymorphism Types:
                                </h4>
                                <p className="text-gray-700 dark:text-gray-300 mt-2 leading-relaxed">
                                    Polymorphism in OOP can be categorized into two types:
                                </p>
                                <ul className="list-disc ml-6 space-y-2 text-gray-700 dark:text-gray-300">
                                    <li>
                                        <strong>Compile-Time Polymorphism</strong>
                                        <ul className="list-disc ml-6">
                                            <li>a) <strong>Function Overloading</strong></li>
                                            <li>b) <strong>Operator Overloading</strong></li>
                                        </ul>
                                    </li>
                                    <li>
                                        <strong>Run-Time Polymorphism</strong>
                                    </li>
                                </ul>

                                <h4 className="mt-6 text-xl font-semibold text-gray-800 dark:text-gray-200">
                                    1. Compile-Time Polymorphism:
                                </h4>

                                <p className="mt-2">
                                    <strong>a) Function Overloading:</strong> Function overloading is when
                                    two or more functions in the same scope have the same name but
                                    different parameters.
                                </p>

                                <SyntaxHighlighter language="cpp" style={dracula} className="rounded-lg shadow-md mt-4">
                                    {`#include <iostream>
using namespace std;

class Printer {
public:
    void print(int i) { cout << "Printing integer: " << i << endl; }
    void print(double d) { cout << "Printing double: " << d << endl; }
    void print(string s) { cout << "Printing string: " << s << endl; }
};

int main() {
    Printer p;
    p.print(10);
    p.print(3.14);
    p.print("Hello");
    return 0;
}`}
                                </SyntaxHighlighter>

                                <p className="mt-4">
                                    <strong>b) Operator Overloading:</strong> Operator overloading allows
                                    defining the behavior of operators for user-defined classes.
                                </p>

                                <SyntaxHighlighter language="cpp" style={dracula} className="rounded-lg shadow-md mt-4">
                                    {`#include <iostream>
using namespace std;

class Complex {
public:
    int real, imag;

    Complex(int r, int i) : real(r), imag(i) {}

    Complex operator + (Complex const &other) {
        return Complex(real + other.real, imag + other.imag);
    }

    void display() { cout << real << " + " << imag << "i" << endl; }
};

int main() {
    Complex c1(3, 4), c2(1, 2);
    Complex c3 = c1 + c2;
    c3.display();
    return 0;
}`}
                                </SyntaxHighlighter>

                                <h4 className="mt-6 text-xl font-semibold text-gray-800 dark:text-gray-200">
                                    2. Run-Time Polymorphism:
                                </h4>

                                <p className="mt-2">
                                    Run-time polymorphism is achieved through <strong>inheritance</strong>{" "}
                                    and <strong>virtual functions</strong>. It allows a base class
                                    reference or pointer to call derived class methods.
                                </p>

                                <SyntaxHighlighter language="cpp" style={dracula} className="rounded-lg shadow-md mt-4">
                                    {`#include <iostream>
using namespace std;

class Animal {
public:
    virtual void sound() { cout << "Animal makes a sound." << endl; }
};

class Dog : public Animal {
public:
    void sound() override { cout << "Dog barks." << endl; }
};

class Cat : public Animal {
public:
    void sound() override { cout << "Cat meows." << endl; }
};

int main() {
    Animal* animal1 = new Dog();
    Animal* animal2 = new Cat();

    animal1->sound();
    animal2->sound();

    delete animal1;
    delete animal2;
    return 0;
}`}
                                </SyntaxHighlighter>

                                <h4 className="mt-6 text-xl font-semibold text-gray-800 dark:text-gray-200">
                                    Summary:
                                </h4>
                                <ul className="list-disc ml-6 space-y-2 text-gray-700 dark:text-gray-300">
                                    <li>
                                        <strong>Compile-Time Polymorphism:</strong> Achieved through
                                        function overloading and operator overloading.
                                    </li>
                                    <li>
                                        <strong>Run-Time Polymorphism:</strong> Achieved through inheritance
                                        and virtual functions.
                                    </li>
                                </ul>
                            </div>
                        </div>


                        <div className='max-w-4xl mx-auto px-4 md:px-6 py-6' id='Inheritance'>
                            <div className='mb-2'>
                                <div className='bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm'>
                                    <h3 className='mt-4 font-semibold text-2xl mb-6 text-gray-800 dark:text-gray-100'>Inheritance</h3>
                                    <p className='text-gray-700 dark:text-gray-300 mt-2 leading-relaxed'>
                                        Inheritance is the process by which one class acquires the properties and methods of another class.
                                        It helps to reuse the code and establish a relationship between different classes.
                                    </p>

                                    <h4 className='font-semibold text-lg mt-6 mb-3 text-gray-800 dark:text-gray-200'>There are five types of inheritance:</h4>

                                    <ul className='list-decimal ml-6 space-y-2 mb-6'>
                                        <li className='text-gray-700 dark:text-gray-300'>Single Inheritance</li>
                                        <li className='text-gray-700 dark:text-gray-300'>Multiple Inheritance</li>
                                        <li className='text-gray-700 dark:text-gray-300'>Multilevel Inheritance</li>
                                        <li className='text-gray-700 dark:text-gray-300'>Hierarchical Inheritance</li>
                                        <li className='text-gray-700 dark:text-gray-300'>Hybrid Inheritance</li>
                                    </ul>

                                    {/* Single Inheritance */}
                                    <div>
                                        <h4 className='font-semibold text-lg mt-6 mb-3 text-gray-800 dark:text-gray-200'>Single Inheritance</h4>
                                        <p className='text-gray-700 dark:text-gray-300 mt-2 leading-relaxed'>
                                            Single inheritance occurs when a child class inherits from a single parent class.
                                        </p>

                                        <h4 className="font-semibold text-lg mb-3 text-gray-800 dark:text-gray-100">Example</h4>
                                        <SyntaxHighlighter language='cpp' style={dracula} className='rounded-md shadow-md p-4 text-sm'>
                                            {`#include <iostream>
using namespace std;

class Animal {
public:
    void eat() {
        cout << "Animal is eating." << endl;
    }
};

class Dog : public Animal {
public:
    void bark() {
        cout << "Dog is barking." << endl;
    }
};

int main() {
    Dog myDog;
    myDog.eat();
    myDog.bark();
    return 0;
}`}
                                        </SyntaxHighlighter>

                                        <h4 className="font-semibold text-lg mb-3 text-gray-800 dark:text-gray-100">Output</h4>

                                        <SyntaxHighlighter language='text' style={dracula} className='rounded-md shadow-md p-4 text-sm'>
                                            {`Animal is eating.
Dog is barking.`}
                                        </SyntaxHighlighter>
                                    </div>

                                    {/* Multiple Inheritance */}
                                    <div>
                                        <h4 className='font-semibold text-lg mt-6 mb-3 text-gray-800 dark:text-gray-200'>Multiple Inheritance</h4>
                                        <p className='text-gray-700 dark:text-gray-300 mt-2 leading-relaxed'>
                                            A child class inherits from multiple parent classes.
                                        </p>

                                        <h4 className="font-semibold text-lg mb-3 text-gray-800 dark:text-gray-100">Example</h4>

                                        <SyntaxHighlighter language='cpp' style={dracula} className='rounded-md shadow-md p-4 text-sm'>
                                            {`#include <iostream>
using namespace std;

class Engine {
public:
    void startEngine() {
        cout << "Engine started." << endl;
    }
};

class Wheels {
public:
    void rotateWheels() {
        cout << "Wheels are rotating." << endl;
    }
};

class Car : public Engine, public Wheels {
public:
    void drive() {
        cout << "Car is driving." << endl;
    }
};

int main() {
    Car myCar;
    myCar.startEngine();
    myCar.rotateWheels();
    myCar.drive();
    return 0;
}`}
                                        </SyntaxHighlighter>

                                        <h4 className="font-semibold text-lg mb-3 text-gray-800 dark:text-gray-100">Output</h4>

                                        <SyntaxHighlighter language='text' style={dracula} className='rounded-md shadow-md p-4 text-sm'>
                                            {`Engine started.
Wheels are rotating.
Car is driving.`}
                                        </SyntaxHighlighter>

                                    </div>

                                    {/* Multilevel Inheritance */}
                                    <div>
                                        <h4 className='font-semibold text-lg mt-6 mb-3 text-gray-800 dark:text-gray-200'>Multilevel Inheritance</h4>
                                        <p className='text-gray-700 dark:text-gray-300 mt-2 leading-relaxed'>
                                            In multilevel inheritance, a class is derived from another derived class.
                                        </p>

                                        <h4 className="font-semibold text-lg mb-3 text-gray-800 dark:text-gray-100">Example</h4>


                                        <SyntaxHighlighter language='cpp' style={dracula} className='rounded-md shadow-md p-4 text-sm'>
                                            {`#include <iostream>
using namespace std;

class Animal {
public:
    void eat() {
        cout << "Animal is eating." << endl;
    }
};

class Mammal : public Animal {
public:
    void walk() {
        cout << "Mammal is walking." << endl;
    }
};

class Dog : public Mammal {
public:
    void bark() {
        cout << "Dog is barking." << endl;
    }
};

int main() {
    Dog myDog;
    myDog.eat();
    myDog.walk();
    myDog.bark();
    return 0;
}`}
                                        </SyntaxHighlighter>

                                        <h4 className="font-semibold text-lg mb-3 text-gray-800 dark:text-gray-100">Output</h4>

                                        <SyntaxHighlighter language='text' style={dracula} className='rounded-md shadow-md p-4 text-sm'>
                                            {`Animal is eating.
Mammal is walking.
Dog is barking.`}
                                        </SyntaxHighlighter>
                                    </div>

                                    {/* Hierarchical Inheritance */}
                                    <div>
                                        <h4 className='font-semibold text-lg mt-6 mb-3 text-gray-800 dark:text-gray-200'>Hierarchical Inheritance</h4>
                                        <p className='text-gray-700 dark:text-gray-300 mt-2 leading-relaxed'>
                                            Multiple child classes inherit from a single parent class.
                                        </p>

                                        <h4 className="font-semibold text-lg mb-3 text-gray-800 dark:text-gray-100">Example</h4>
                                        <SyntaxHighlighter language='cpp' style={dracula} className='rounded-md shadow-md p-4 text-sm'>
                                            {`#include <iostream>
using namespace std;

class Animal {
public:
    void sleep() {
        cout << "Animal is sleeping." << endl;
    }
};

class Dog : public Animal {
public:
    void bark() {
        cout << "Dog is barking." << endl;
    }
};

class Cat : public Animal {
public:
    void meow() {
        cout << "Cat is meowing." << endl;
    }
};

int main() {
    Dog myDog;
    Cat myCat;

    myDog.sleep();
    myDog.bark();
    myCat.sleep();
    myCat.meow();
    return 0;
}`}
                                        </SyntaxHighlighter>

                                        <h4 className="font-semibold text-lg mb-3 text-gray-800 dark:text-gray-100">Output</h4>

                                        <SyntaxHighlighter language='text' style={dracula} className='rounded-md shadow-md p-4 text-sm'>
                                            {`Animal is sleeping.
Dog is barking.
Animal is sleeping.
Cat is meowing.`}
                                        </SyntaxHighlighter>
                                    </div>

                                    {/* Hybrid Inheritance */}
                                    <div>
                                        <h4 className='font-semibold text-lg mt-6 mb-3 text-gray-800 dark:text-gray-200'>Hybrid Inheritance</h4>
                                        <p className='text-gray-700 dark:text-gray-300 mt-2 leading-relaxed'>
                                            A mix of multiple and multilevel inheritance.
                                        </p>

                                        <h4 className="font-semibold text-lg mb-3 text-gray-800 dark:text-gray-100">Example</h4>

                                        <SyntaxHighlighter language='cpp' style={dracula} className='rounded-md shadow-md p-4 text-sm'>
                                            {`#include <iostream>
using namespace std;

class Engine {
public:
    void startEngine() {
        cout << "Engine started." << endl;
    }
};

class Vehicle : public Engine {
public:
    void honk() {
        cout << "Vehicle is honking." << endl;
    }
};

class Wheels {
public:
    void rotateWheels() {
        cout << "Wheels are rotating." << endl;
    }
};

class Car : public Vehicle, public Wheels {
public:
    void drive() {
        cout << "Car is driving." << endl;
    }
};

int main() {
    Car myCar;
    myCar.startEngine();
    myCar.honk();
    myCar.rotateWheels();
    myCar.drive();
    return 0;
}`}
                                        </SyntaxHighlighter>

                                        <h4 className="font-semibold text-lg mb-3 text-gray-800 dark:text-gray-100">Output</h4>

                                        <SyntaxHighlighter language='text' style={dracula} className='rounded-md shadow-md p-4 text-sm'>
                                            {`Engine started.
Vehicle is honking.
Wheels are rotating.    
Car is driving.`}
                                        </SyntaxHighlighter>

                                        {/* Comparison Table */}
                                        <div className="mt-10">
                                            <h3 className="font-bold text-lg mb-4 text-center text-gray-800 dark:text-gray-100">
                                                Summary of Inheritance Types
                                            </h3>
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
                                                    <TableRow className=" dark:odd:bg-gray-800 dark:even:bg-gray-700">
                                                        <TableCell className="font-semibold">private</TableCell>
                                                        <TableCell>Accessible within the same class</TableCell>
                                                        <TableCell>❌ Not accessible in derived class</TableCell>
                                                    </TableRow>

                                                    <TableRow className=" dark:odd:bg-gray-800 dark:even:bg-gray-700">
                                                        <TableCell className="font-semibold">public</TableCell>
                                                        <TableCell>Accessible from anywhere the object is visible</TableCell>
                                                        <TableCell>✅ Accessible in derived class</TableCell>
                                                    </TableRow>

                                                    <TableRow className="dark:odd:bg-gray-800 dark:even:bg-gray-700">
                                                        <TableCell className="font-semibold">protected</TableCell>
                                                        <TableCell>Accessible within the same class and derived classes</TableCell>
                                                        <TableCell>✅ Accessible in derived class, but not outside</TableCell>
                                                    </TableRow>
                                                </TableBody>
                                            </Table>

                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>


                        <div className='max-w-4xl mx-auto px-4 md:px-6 py-6 ' id='Encapsulation'>
                            <div className='mb-2'>
                                <div className='bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm'>
                                    <h3 className='mt-4 font-semibold text-2xl mb-6 text-gray-800 dark:text-gray-100' >Encapsulation</h3>
                                    <p className='text-gray-700 dark:text-gray-300 mt-2 leading-relaxed'>
                                        Encapsulation is the process of wrapping data (variables) and code acting on the data (methods) into a single unit called a class. It helps to protect the data from unauthorized access.
                                    </p>
                                </div>

                            </div>
                        </div>

                        <div className="max-w-4xl mx-auto px-4 md:px-6 py-6" id='Friend Function and Friend Class'>
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
                                                {`#include <iostream>
using namespace std;

class Box {
private:
    int width;
public:
    Box(int w) : width(w) {}

    // Declaring a friend function
    friend void printWidth(Box b);
};

// Friend function definition
void printWidth(Box b) {
    cout << "Width of the box: " << b.width << endl;
}

int main() {
    Box b(10);
    printWidth(b);  // Friend function can access private data
    return 0;
}`}

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
                                                {`#include <iostream>
using namespace std;

class Engine {
private:
    int horsepower;
public:
    Engine(int hp) : horsepower(hp) {}

    // Declaring Car as a friend class
    friend class Car;
};

class Car {
public:
    void showEnginePower(Engine e) {
        cout << "Car engine power: " << e.horsepower << " HP" << endl;
    }
};

int main() {
    Engine e(200);
    Car c;
    c.showEnginePower(e);  // Friend class can access private members
    return 0;
}
`}

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
                        <div className="max-w-4xl mx-auto px-4 md:px-6 py-6" id='Access Modifier'>
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
            </div>


        </div>
    );
};

export default OOPS;
