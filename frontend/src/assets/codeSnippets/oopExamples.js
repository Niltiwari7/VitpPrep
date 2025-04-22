export const classSnippet = `class Student {
public:
    string name;
    int age;
};`;

export const ObjectSnippet = `#include <iostream>
using namespace std;

class Student {
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
}`;

export const constructorSnippet = `#include<iostream>
using namespace std;
class Student {
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
}`;
        

export const destuructorSnippet = `#include<iostream>
using namespace std;
class MyClass {
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
}`;

export const abstractionSnippet = `#include <iostream>
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
}`;

export const functionOverLoadingSnippet = `#include <iostream>
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
}`;

export const operatorOverLoadingSnippet = `#include <iostream>
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
}`;

export const runTimePolymorphismSnippet = `#include <iostream>
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
}`;

export const singleInheritenceSnippet = `#include <iostream>
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
}`;

export const multipleInheritenceSnippet = `#include <iostream>
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
}`;


export const multilevelInheritenceSnippet = `#include <iostream>
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
}`;


export const hierarchicalInheritenceSnippet = `#include <iostream>
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
}`;

export const hybridInheritenceSnippet = `#include <iostream>
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
}`;

export const friendfunctionSnippet = `#include <iostream>
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
}`;

export const friendclassSnippet = `#include <iostream>
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
}`;

export const privateAccessSpecifierSnippet = `#include <iostream>
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
}`;

export const publicAccessSpecifierSnippet = `#include <iostream>
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
}`;

export const protectedAccessSpecifierSnippet = `#include <iostream>
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
}`;