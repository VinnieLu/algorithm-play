

Pig latin is created by taking all the consonants before the first vowel of a word and moving them to the back of the word followed by the letters "ay".

"hello" => "ellohay"
"creating" => "eatingcray"
If the first letter of the word is a vowel, the string is left the same and the letters "way" are appended to the end.

"algorithm" => "algorithmway"
This problem is different from other variations in that it expects casing to remain the same so:

"Hello World" => "Ellohay Orldway"
as well as punctuation.

"Pizza? Yes please!" => "Izzapay? Esyay easeplay!"
Your job is to take a string and translate it to Pig Latin. The string will never be undefined but may contain both numbers and letters. A word will never be a combination of numbers and letters. Also, there will never be punctuation at the beginning of a word and the only capital letter in a word will be the first letter meaning there are zero all capitalized words.



function translate(sentence) {
  var split = sentence.split(" ")
  var final = []
  for (var i = 0; i < split.length; i++) {
    var substring = split[i]
    var downCase = true
    var punctuation = ""
    for (var l = split[i].length - 1; l >= 0; l--) {
      if ((split[i][l]).toLowerCase() === (split[i][l]).toUpperCase()) {
        punctuation = split[i][split[i].length-1] + punctuation
        substring = substring.substring(0, substring.length-1)
      } else {
        l = -1
      }
    }
    for (var j = 0; j < split[i].length; j++) {
      if (split[i][j].toUpperCase() === split[i][j]) {
        downCase = false
      }
      if (split[i][j].toLowerCase() === "a" || split[i][j].toLowerCase() === "e" || split[i][j].toLowerCase() === "i" || split[i][j].toLowerCase() === "o" || split[i][j].toLowerCase() === "u") {
        if (j === 0) {
          substring += "way"
          j = split[i].length
        } else {
          substring += "ay"
          j = split[i].length
        }
      } else {
        substring = substring.substring(1, substring.length) + substring.substring(0, 1).toLowerCase()
      }
    }
    if (downCase === false) {
      substring = substring[0].toUpperCase() + substring.substring(1, substring.length)
    }
    substring = substring + punctuation
    final.push(substring)
  }
  return final.join(" ")
};





Task
Write a function that accepts two inputs: code and message and returns an encrypted string from message using the code.
The code is a string that generates the key in the way shown below:

 1  | h a m s t e r
 2  | i b n   u f
 3  | j c o   v g
 4  | k d p   w
 5  | l   q   x
 6  |         y
 7  |         z
All letters from code get number 1. All letters which directly follow letters from code get number 2 (unless they already have a smaller number assigned), etc. It's difficult to describe but it should be easy to understand from the example below:

 1  | a e h m r s t
 2  | b f i n     u
 3  | c g j o     v
 4  | d   k p     w
 5  |     l q     x
 6  |             y
 7  |             z
How does the encoding work using the hamster code?

a => a1
b => a2
c => a3
d => a4
e => e1
f => e2
...
And applying it to strings :

hamsterMe('hamster', 'hamster')   => h1a1m1s1t1e1r1
hamsterMe('hamster', 'helpme')    => h1e1h5m4m1e1
And you probably started wondering what will happen if there is no a in the code.
Just add these letters after the last available letter (in alphabetic order) in the code.

The key for code hmster is:

 1  | e h m r s t
 2  | f i n     u
 3  | g j o     v
 4  |   k p     w
 5  |   l q     x
 6  |           y
 7  |           z
 8  |           a
 9  |           b
10  |           c
11  |           d
Additional notes
The code will have at least 1 letter.
Duplication of letters in code is possible and should be handled.
The code and message consist of only lowercase letters.


function hamsterMe(code, message) {
  var alphabet = "abcdefghijklmnopqrstuvwxyz"
  var comp = {}
  for (var i = 0; i < code.length; i++) {
    if (!(comp[code[i]])) {
      comp[code[i]] = []
    }
  }
  var thisOne = 0
  for (var j = 0; j < alphabet.length; j++) {
    if (comp[alphabet[j]]) {
      if (thisOne) {
        thisOne = alphabet[j]
      } else {
        var thisOne = alphabet[j]
        var redo = j
      }
    } else if (thisOne) {
      comp[thisOne].push(alphabet[j])
    }
    if (alphabet[j] === "z") {
      for (var e = 0; e < redo; e++) {
        comp[thisOne].push(alphabet[e])
      }
    }
  }
  var count = {}
  Object.keys(comp).forEach(function(letter) {
    count[letter] = letter + "1"
    for (var g = 0; g < comp[letter].length; g++) {
      count[comp[letter][g]] = letter + "" + (g + 2)
    }
  })
  var final = ""
  for (var t = 0; t < message.length; t++) {
    final += count[message[t]]
  }
  return final
}







Given a string, return a new string that has transformed based on the input:

Change case of every character, ie. lower case to upper case, upper case to lower case.
Reverse the order of words from the input.
For example:
stringTransformer('Example Input')/string_transformer("Example Input") (depending on the language you are completing the Kata in) should return 'iNPUT eXAMPLE'

You may assume the input only contain English alphabet and spaces.

function stringTransformer(str) {
  var split = str.split(" ")
  var final = []
  for (var i = split.length-1; i >= 0; i--) {
    var substring = ""
    for (var j = 0; j < split[i].length; j++) {
      if (split[i][j].toLowerCase() === split[i][j]) {
        substring += split[i][j].toUpperCase()
      } else if (split[i][j].toUpperCase() === split[i][j]) {
        substring += split[i][j].toLowerCase()
      }
    }
    final.push(substring)
  }
  return final.join(" ")
}


Task
Write a function that accepts msg string and returns local tops of string from the highest to the lowest.
The string's tops are from displaying the string in the below way:

                                                      3 
                              p                     2   4
            g               o   q                 1
  b       f   h           n       r             z 
a   c   e       i       m          s          y
      d           j   l             t       x
                    k                 u   w 
                                        v
The next top is always 1 character higher than the previous one. For the above example, the solution for the abcdefghijklmnopqrstuvwxyz1234 input string is 3pgb.

When the msg string is empty, return an empty string.
The input strings may be very long. Make sure your solution has good performance.
Check the test cases for more samples.


function tops(msg) {
   var recent = [0, 0]
   var current = [0]
   var final = ""
   var direction = "up"
   for (var i = 0; i < msg.length; i++) {
     if (current[0] > recent[0]) {
       final += msg[i]
       recent[0] = current[0]
       direction = "down"
     } else if (current[0] < recent[1]) {
       recent[1] = current[0]
       direction = "up"
     }
     if (direction === "up") {
       current[0] += 1
     } else if (direction === "down") {
       current[0] -= 1
     }
   }
   return final.split("").reverse().join("")
}



Dave has a lot of data he is required to apply filters to, which are simple enough, but he wants a shorter way of doing so.

He wants the following functions to work as expected:

even    // [1,2,3,4,5].even() should return [2,4]
odd     // [1,2,3,4,5].odd() should return [1,3,5]
under   // [1,2,3,4,5].under(4) should return [1,2,3]
over    // [1,2,3,4,5].over(4) should return [5]
inRange // [1,2,3,4,5].inRange(1,3) should return [1,2,3]
They should also work when used together, for example:

[1,2,18,19,20,21,22,30,40,50,100].even().inRange(18,30) // should return [18, 20, 22, 30]
And finally the filters should only accept integer values from an array, for example:

["a", 1, "b", 300, "x", "q", 63, 122, 181, "z", 0.83, 0.11].even() // should return [300, 122]

Array.prototype.even = function(){
  final = []
  for (i=0; i<this.length; i++) {
    if ((this[i] % 2 === 0) && Number.isInteger(this[i])) {
      final.push(this[i])
    }
  }
  return final
}

Array.prototype.odd = function(){
  final = []
  for (i=0; i<this.length; i++) {
    if ((this[i] % 2 === 1) && Number.isInteger(this[i])) {
      final.push(this[i])
    }
  }
  return final
}

Array.prototype.under = function(x){
  final = []
  for (i=0; i<this.length; i++) {
    if ((this[i] < x) && Number.isInteger(this[i])) {
      final.push(this[i])
    }
  }
  return final
}

Array.prototype.over = function(x){
  final = []
  for (i=0; i<this.length; i++) {
    if ((this[i] > x) && Number.isInteger(this[i])) {
      final.push(this[i])
    }
  }
  return final
}

Array.prototype.inRange = function(min,max){
  final = []
  for (i=0; i<this.length; i++) {
    if ((min <= this[i] && this[i] <= max) && Number.isInteger(this[i])) {
      final.push(this[i])
    }
  }
  return final
}



You have to extract a portion of the file name as follows:

Assume it will start with date represented as long number
Followed by an underscore
Youll have then a filename with an extension
it will always have an extra extension at the end
Inputs:
1231231223123131_FILE_NAME.EXTENSION.OTHEREXTENSION

1_This_is_an_otherExample.mpg.OTHEREXTENSIONadasdassdassds34

1231231223123131_myFile.tar.gz2
Outputs
FILE_NAME.EXTENSION

This_is_an_otherExample.mpg

myFile.tar
The recommend way to solve it is using RegEx and specifically groups.


class FileNameExtractor
    def self.extract_file_name(dirtyFileName)
       indices = []
       i = 0
       dots = 0
       date = true
       until i > dirtyFileName.length
         if date == true && dirtyFileName[i] == "_"
           date = false
           indices.push(i)
         end
         if dots == 1 && dirtyFileName[i] == "."
           dots += 1
           indices.push(i)
         end
         if dots == 0 && dirtyFileName[i] == "."
           dots += 1
         end
       i += 1
       end
       return dirtyFileName[indices[0] + 1..indices[1] - 1]
    end
end



The Fibonacci numbers are the numbers in the following integer sequence (Fn):

0, 1, 1, 2, 3, 5, 8, 13, 21, 34, 55, 89, 144, 233, ...

such as

F(n) = F(n-1) + F(n-2) with F(0) = 0 and F(1) = 1.

Given a number, say prod (for product), we search two Fibonacci numbers F(n) and F(n+1) verifying

F(n) * F(n+1) = prod.

Your function productFib takes an integer (prod) and returns an array:

[F(n), F(n+1), true] or {F(n), F(n+1), 1} or (F(n), F(n+1), True)
depending on the language if F(n) * F(n+1) = prod.

If you dont find two consecutive F(m) verifying F(m) * F(m+1) = prod you will return

[F(m), F(m+1), false] or {F(n), F(n+1), 0} or (F(n), F(n+1), False)
F(m) being the smallest one such as F(m) * F(m+1) > prod.

Examples
productFib(714) # should return [21, 34, true], 
                # since F(8) = 21, F(9) = 34 and 714 = 21 * 34

productFib(800) # should return [34, 55, false], 
                # since F(8) = 21, F(9) = 34, F(10) = 55 and 21 * 34 < 800 < 34 * 55
Notes: Not useful here but we can tell how to choose the number n up to which to go: we can use the "golden ratio" phi which is (1 + sqrt(5))/2 knowing that F(n) is asymptotic to: phi^n / sqrt(5). That gives a possible upper bound to n.



function fibonacci(n) {
  var fib = [0, 1]
  for (var i = 3; i <= n; i++) {
    fib.push(fib[i-2] + fib[i-3])
  }
  return fib
}

function productFib(prod){
  var fib = fibonacci(prod)
  for (var i = 1; i < fib.length; i++) {
    if (fib[i] * fib[i+1] === prod) {
      return [fib[i], fib[i+1], true]
    } else if (fib[i] * fib[i+1] > prod) {
      return [fib[i], fib[i+1], false]
    }
  }
}