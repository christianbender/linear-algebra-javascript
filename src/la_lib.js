/*
    author: Christian Bender
    license: MIT-license
    
    The namespace LinearAlgebra contains useful classes and functions for dealing with
    linear algebra under JavaScript.
*/
var LinearAlgebra;
(function (LinearAlgebra) {
    /*
        class: Vector
        This class represents a vector of arbitrary size and operations on it.
    */
    var Vector = /** @class */ (function () {
        // constructor 
        function Vector(N, comps) {
            if (comps === void 0) { comps = []; }
            this.components = new Array(N);
            if (comps.length == 0) {
                for (var i = 0; i < N; i++) {
                    this.components[i] = 0.0;
                }
            }
            else {
                if (N == comps.length) {
                    this.components = comps;
                }
                else {
                    throw "Vector: invalide size!";
                }
            }
        } // end of constructor
        // returns the size of this vector. 
        // not the eulidean length!
        Vector.prototype.size = function () {
            return this.components.length;
        };
        // computes the eulidean length.
        Vector.prototype.eulideanLength = function () {
            var sum = 0;
            for (var i = 0; i < this.components.length; i++) {
                sum += this.components[i] * this.components[i];
            }
            return Math.sqrt(sum);
        };
        // getter for the components of the vector.
        // returns a specified component (index)
        Vector.prototype.component = function (index) {
            return this.components[index];
        };
        // setter for a specified component of this vector.
        Vector.prototype.changeComponent = function (index, value) {
            if (index >= 0 && index < this.components.length) {
                this.components[index] = value;
            }
            else {
                throw "changeComponent: index out of bounds!";
            }
        };
        // vector addition
        Vector.prototype.add = function (other) {
            if (this.size() == other.size()) {
                var SIZE = this.size();
                var ans = new Vector(SIZE);
                for (var i = 0; i < SIZE; i++) {
                    ans.changeComponent(i, (this.components[i] + other.component(i)));
                }
                return ans;
            }
            else {
                throw "add: vector must have same size!";
            }
        };
        // vector subtraction
        Vector.prototype.sub = function (other) {
            if (this.size() == other.size()) {
                var SIZE = this.size();
                var ans = new Vector(SIZE);
                for (var i = 0; i < SIZE; i++) {
                    ans.changeComponent(i, (this.components[i] - other.component(i)));
                }
                return ans;
            }
            else {
                throw "add: vector must have same size!";
            }
        };
        // dot-product
        Vector.prototype.dot = function (other) {
            var sum = 0;
            if (other.size() == this.size()) {
                var SIZE = other.size();
                for (var i = 0; i < SIZE; i++) {
                    sum += this.components[i] * other.component(i);
                }
                return sum;
            }
            else {
                throw "dot: vectors must have same size!";
            }
        };
        // scalar multiplication
        Vector.prototype.scalar = function (s) {
            var SIZE = this.size();
            var ans = new Vector(SIZE);
            for (var i = 0; i < SIZE; i++) {
                ans.changeComponent(i, (this.components[i] * s));
            }
            return ans;
        };
        // returns a string representation of this vector.
        Vector.prototype.toString = function () {
            var ans = "(";
            var SIZE = this.components.length;
            for (var i = 0; i < SIZE; i++) {
                if (i < SIZE - 1) {
                    ans += this.components[i] + ",";
                }
                else {
                    ans += this.components[i] + ")";
                }
            }
            return ans;
        };
        // converts this vector in a unit basis vector and returns it.
        // the One is on position 'pos'
        Vector.prototype.createUnitBasis = function (pos) {
            if (pos >= 0 && pos < this.components.length) {
                for (var i = 0; i < this.components.length; i++) {
                    if (i == pos) {
                        this.components[i] = 1.0;
                    }
                    else {
                        this.components[i] = 0.0;
                    }
                }
            }
            else {
                throw "createUnitBasis: index out of bounds";
            }
            return this;
        };
        // normalizes this vector and returns it.
        Vector.prototype.norm = function () {
            var SIZE = this.size();
            var quotient = 1.0 / this.eulideanLength();
            for (var i = 0; i < SIZE; i++) {
                this.components[i] = this.components[i] * quotient;
            }
            return this;
        };
        return Vector;
    }()); // end of class Vector
    LinearAlgebra.Vector = Vector;
    // -------------- global functions ---------------------------------
    // returns a unit basis vector of size N with a One on position 'pos'
    function unitBasisVector(N, pos) {
        var ans = new Vector(N);
        for (var i = 0; i < N; i++) {
            if (i == pos) {
                ans.changeComponent(i, 1.0);
            }
            else {
                ans.changeComponent(i, 0);
            }
        }
        return ans;
    }
    LinearAlgebra.unitBasisVector = unitBasisVector;
    // returns a random vector with integer components (between 'a' and 'b') of size N.
    function randomVectorInt(N, a, b) {
        var ans = new Vector(N);
        for (var i = 0; i < N; i++) {
            ans.changeComponent(i, (Math.floor((Math.random() * b) + a)));
        }
        return ans;
    }
    LinearAlgebra.randomVectorInt = randomVectorInt;
    // returns a random vector with floating point components (between 'a' and 'b') of size N.
    function randomVectorFloat(N, a, b) {
        var ans = new Vector(N);
        for (var i = 0; i < N; i++) {
            ans.changeComponent(i, ((Math.random() * b) + a));
        }
        return ans;
    }
    LinearAlgebra.randomVectorFloat = randomVectorFloat;
})(LinearAlgebra || (LinearAlgebra = {})); // end of namespace LinearAlgebra
