Inputs should be in the JSON Format, following the following template:
{"Command":"COMMAND","Target":["toBeAltered","password"]}


Recognized Commands:
-ENCRYPT: modifies toBeAltered according to the encryption rule with password as its input
-DECRYPT: modifies toBeAltered according to the encryption rule with password as its input

Target Information
-toBeAltered: Must be charecters with ASCII values within the range [35, 126] (meaning 35 and 126 are OK). In simpler terms, no bizzare charecters not found on a standard english keyboard, spaces, "s, or !s.
-password: Must be charecters that are not spaces or "s.


Response Commands:
-INVALID_INPUT_COMMAND: Something was wrong with the input JSON, specifically the COMMAND section, meaning the first part of the JSON file is not {"Command":"
-INVALID_INPUT_TARGET: Something was wrong with the input JSON, specifically the target section did not begin at the expected charecter or the target was not an array. For Encrypt and Decrypt, charecter 31 in the JSON should be '[', the start of the array. Note that not recieving this DOES NOT mean your target was good, it just means the program didn't catch it