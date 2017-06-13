import { FormControl } from '@angular/forms'

export function restrictedWords(words) {
    return (control: FormControl): {[key: string]: any} => { // typescript syntax returns a array key value
                                                            // value pairs of type any.
      if (!words) return null

      var invalidWords = words // this chaining functions syntax takes 'words' passes it in as a param for map
        .map(w => control.value.includes(w) ? w : null) // map takes some form of a list and applies
                                                        // a function to it. 
        .filter(w => w != null)// next filter removes null from list

      return invalidWords && invalidWords.length > 0
        ? {'restrictedWords': invalidWords.join(', ')} // assigning a object setting a attribute to restrictedWords
        : null
    }
  }