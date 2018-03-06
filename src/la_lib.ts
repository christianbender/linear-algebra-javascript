/*
    author: Christian Bender
    license: MIT-license
    
    The namespace LinearAlgebra contains useful classes and functions for dealing with
    linear algebra under JavaScript.
*/

namespace LinearAlgebra {
    /*
        class: Vector
        This class represents a vector of arbitrary size and operations on it.
    */
    export class Vector {

        // the vector components
        private components: number[];

        // constructor 
        constructor(N: number, comps: number[] = []) {
            this.components = new Array(N);
            if (comps.length == 0) { // creates a zero vector of size N
                for (var i = 0; i < N; i++) {
                    this.components[i] = 0.0;
                }
            } else { // assigns the components
                if (N == comps.length) {
                    this.components = comps;
                } else {
                    throw "Vector: invalide size!";
                }

            }
        } // end of constructor

        // returns the size of this vector. 
        // not the eulidean length!
        size(): number {
            return this.components.length;
        }

        // computes the eulidean length.
        eulideanLength(): number {
            var sum: number = 0;
            for (var i = 0; i < this.components.length; i++) {
                sum += this.components[i] * this.components[i];
            }
            return Math.sqrt(sum);
        }

        // getter for the components of the vector.
        // returns a specified component (index)
        component(index: number): number {
            return this.components[index];
        }

        // setter for a specified component of this vector.
        changeComponent(index: number, value: number): void {
            if (index >= 0 && index < this.components.length) {
                this.components[index] = value;
            } else { // error case
                throw "changeComponent: index out of bounds!";
            }
        }

        // vector addition
        add(other: Vector): Vector {
            if (this.size() == other.size()) {
                var SIZE = this.size();
                var ans: Vector = new Vector(SIZE);
                for (var i = 0; i < SIZE; i++) {
                    ans.changeComponent(i, (this.components[i] + other.component(i)));
                }
                return ans;
            } else {
                throw "add: vector must have same size!";
            }
        }

        // vector subtraction
        sub(other: Vector): Vector {
            if (this.size() == other.size()) {
                var SIZE = this.size();
                var ans: Vector = new Vector(SIZE);
                for (var i = 0; i < SIZE; i++) {
                    ans.changeComponent(i, (this.components[i] - other.component(i)));
                }
                return ans;
            } else { // error case
                throw "add: vector must have same size!";
            }
        }

        // dot-product
        dot(other: Vector): number {
            var sum: number = 0;
            if (other.size() == this.size()) {
                const SIZE: number = other.size();
                for (var i = 0; i < SIZE; i++) {
                    sum += this.components[i] * other.component(i);
                }
                return sum;
            } else { // error case
                throw "dot: vectors must have same size!";
            }
        }

        // scalar multiplication
        scalar(s: number): Vector {
            const SIZE: number = this.size();
            var ans: Vector = new Vector(SIZE);
            for (var i = 0; i < SIZE; i++) {
                ans.changeComponent(i, (this.components[i] * s));
            }
            return ans;
        }

        // returns a string representation of this vector.
        toString(): string {
            var ans: string = "(";
            var SIZE: number = this.components.length;
            for (var i = 0; i < SIZE; i++) {
                if (i < SIZE - 1) {
                    ans += this.components[i] + ",";
                } else {
                    ans += this.components[i] + ")";
                }
            }
            return ans;
        }

        // converts this vector in a unit basis vector and returns it.
        // the One is on position 'pos'
        createUnitBasis(pos: number): Vector {
            if (pos >= 0 && pos < this.components.length) {
                for (var i = 0; i < this.components.length; i++) {
                    if (i == pos) {
                        this.components[i] = 1.0;
                    } else {
                        this.components[i] = 0.0;
                    }
                }
            } else { // error case
                throw "createUnitBasis: index out of bounds";
            }
            return this;
        }

        // normalizes this vector and returns it.
        norm(): Vector {
            const SIZE: number = this.size();
            var quotient = 1.0 / this.eulideanLength();
            for (var i = 0; i < SIZE; i++) {
                this.components[i] = this.components[i] * quotient;
            }
            return this;
        }

    } // end of class Vector

    // -------------- global functions ---------------------------------

    // returns a unit basis vector of size N with a One on position 'pos'
    export function unitBasisVector(N: number, pos: number): Vector {
        var ans = new Vector(N);
        for (var i = 0; i < N; i++) {
            if (i == pos) {
                ans.changeComponent(i, 1.0);
            } else {
                ans.changeComponent(i, 0);
            }
        }
        return ans;
    }

    // returns a random vector with integer components (between 'a' and 'b') of size N.
    export function randomVectorInt(N: number, a: number, b: number): Vector {
        var ans: Vector = new Vector(N);
        for (var i = 0; i < N; i++) {
            ans.changeComponent(i, (Math.floor((Math.random() * b) + a)));
        }
        return ans;
    }

    // returns a random vector with floating point components (between 'a' and 'b') of size N.
    export function randomVectorFloat(N: number, a: number, b: number): Vector {
        var ans: Vector = new Vector(N);
        for (var i = 0; i < N; i++) {
            ans.changeComponent(i, ((Math.random() * b) + a));
        }
        return ans;
    }

    // ------------------ end of global functions -----------------------------
} // end of namespace LinearAlgebra


