#include "pch.h"
#include <iostream>
#include <fstream>
#include <string>
using namespace std;

int whichCommand(string);
bool compareStringPartial(string, string, int);
void encryptCommand(string);
void decryptCommand(string);
void processFailure(string);

void performCaesarianEncryption(string &, string);
void performCaesarianDecryption(string &, string);
int translatePassword(string);

void setOutFile(string, string);
void clearInputFile();

const string INPUTFILENAME = "EncryptionServiceInput.json";
const string OUTPUTFILENAME = "EncryptionServiceOutput.json";
const string ENCRYPTCOMMAND = "ENCRYPT";
const string DECRYPTCOMMAND = "DECRYPT";
const string VALIDCOMMAND = "{\"Command\":\""; //what must appear first in the json string for it to be valid, must match exactly!
const bool CLEARINPUTFILE = true;              //do we wipe the input file when done, left in false for debug mode
//all charecters in the toBeProtected data must be within the range [MINASCII, MAXASCII]
const int MINASCII = 35;
const int MAXASCII = 126;

int main()
{
    ifstream inputJSONFile; //used to read inputs
    string json;            //where we store the json
    int whatCommand;        //stores which command we're running, 1 = encrypt, 2 = decrypt, while 0 means input error

    inputJSONFile.open(INPUTFILENAME);
    inputJSONFile >> json; //let's put the first line into a string for parsing
    inputJSONFile.close();

    whatCommand = whichCommand(json); //parse the JSON to determine which operation we are performing
    if (whatCommand == 0)
    {
        processFailure("_COMMAND");
    }
    if (whatCommand == 1)
    {
        if (json.length() < 36)
        { //if it's less than 36 chars long, it can't possibly have the proper target format
            processFailure("_TARGET");
        }
        encryptCommand(json);
    }

    else if (whatCommand == 2)
    {
        if (json.length() < 36)
        { //if it's less than 36 chars long, it can't possibly have the proper target format
            processFailure("_TARGET");
        }
        decryptCommand(json);
    }

    clearInputFile();

    return 0;
}

int whichCommand(string json)
{                                     //determines if the request has a valid format, and if, which command is given. Outputs 0 for an invalid request, 1 for an ENCRYPT, or 2 for a DECRYPT
    int currentCharInJSONString = 12; //if format is valid, index 12 is the place where the command starts

    if (compareStringPartial(json, VALIDCOMMAND, 0))
    { //if the input is valid

        if (compareStringPartial(json, ENCRYPTCOMMAND, 12))
        { //check for encryption
            return 1;
        }

        if (compareStringPartial(json, DECRYPTCOMMAND, 12))
        { //and decryption
            return 2;
        }

        return 0; //if none of the values for COMMAND are recognized, we return 0 b/c request is invalid
    }

    return 0; //means that the start of the JSON wasn't as expected, invalid request so return 0
}

bool compareStringPartial(string partialTarget, string mustMatchAll, int startIndex)
{ //compares part of partialTarget, starting at startIndex against mustMatchAll
    if ((partialTarget.length() - startIndex) < mustMatchAll.length())
    { //the partialTarget string must have more charecters left in it than the mustMatchAll string if it contains mustMatchAll
        return false;
    }

    for (int i = 0; i < mustMatchAll.length(); i++)
    {
        if (partialTarget[i + startIndex] != mustMatchAll[i])
        {
            return false; //if any of the charecters don't line up, return false
        }
    }

    return true; //if we survived the loop, then all chars must be equal so we can return true
}

//these functions perform the encryption
int translatePassword(string password)
{ //turns a string into an int between 3 and 252 to be added to be used in caesarian encryptions
    int toBeReturned = 0;

    for (int i = 0; i < password.length(); i++)
    { //add all the ASCII values for password together
        toBeReturned += (int)(password[i]);
    }

    //then fit it into the range by force!
    toBeReturned = toBeReturned % 250;
    toBeReturned += 3;

    return toBeReturned;
}

void performCaesarianEncryption(string &target, string password)
{ //takes target and transforms it via the caesarian encryption rules into an encrypted string
    int currentChar;
    int passwordNumberified = translatePassword(password);

    for (int i = 0; i < target.length(); i++)
    {
        currentChar = (int)target[i];
        currentChar += passwordNumberified; //the core of the encryption, we add the password number to the char

        while (currentChar > MAXASCII)
        {                            //and make sure it's still in the range of MINASCII-MAXASCII, we're assuming that currentChar starts in that range
            currentChar -= MAXASCII; //subtract MAXASCII
            currentChar += MINASCII; //and add MINASCII
        }

        target[i] = (char)currentChar;
    }
}

void performCaesarianDecryption(string &target, string password)
{ //takes target and undoes exactly what performCaesarianEncryption did to it
    int currentChar;
    int passwordNumberified = translatePassword(password);

    for (int i = 0; i < target.length(); i++)
    {
        currentChar = (int)target[i];
        currentChar -= passwordNumberified; //undo what we did to the target in the decryption

        while (currentChar < MINASCII)
        {                            //and make sure it's still in the range of MINASCII-MAXASCII, we're assuming that currentChar starts in that range
            currentChar += MAXASCII; //add MAXASCII
            currentChar -= MINASCII; //and subtract MINASCII
        }

        target[i] = (char)currentChar;
    }
}

//these functions perform file operations
void setOutFile(string command, string target)
{ //writes a JSON object with the chosen command/target key:value fields
    ofstream theOutputFile;
    theOutputFile.open(OUTPUTFILENAME);

    theOutputFile << "{\"Command\":\"";
    theOutputFile << command;
    theOutputFile << "\",\"Target\":\"";
    theOutputFile << target;
    theOutputFile << "\"}";

    theOutputFile.close();
}

void clearInputFile()
{
    ofstream destroyerOfFiles;

    if (CLEARINPUTFILE)
    {
        destroyerOfFiles.open(INPUTFILENAME, ofstream::trunc); //open in trunc mode to delete everything in the input file
        destroyerOfFiles << " ";
        destroyerOfFiles.close();
    }
}

//these are the functions that perform the overall commands,
void encryptCommand(string json)
{                              //encrypts a piece of data specified in a correctly formatted JSON file according to a password in the file, using a caesarian encryption
    string dataToProtect = ""; //the data we're going to protect
    string passwordString = "";
    int currentIndexInJSON = 30;

    if (json[currentIndexInJSON] != '[')
    { //let's just make sure we're properly formatted, we're mostly assuming that, but let's be certain
        processFailure("_TARGET");
        return;
    }

    currentIndexInJSON++;
    currentIndexInJSON++; //now that we've found the [ start, let's move on to the contents, past the [ and the "

    //fill dataToProtect
    while (json[currentIndexInJSON] != '"')
    { //iterate through json until you find a "
        dataToProtect.push_back(json[currentIndexInJSON]);
        currentIndexInJSON++;
    }

    currentIndexInJSON++; //move past the closing " of the JSON's toBeAltered
    currentIndexInJSON++; //and past the ,
    currentIndexInJSON++; //and past the starting " of password

    //fill passwordString
    while (json[currentIndexInJSON] != '"')
    { //iterate through json until you find a "
        passwordString.push_back(json[currentIndexInJSON]);
        currentIndexInJSON++;
    }

    performCaesarianEncryption(dataToProtect, passwordString);

    setOutFile("ENCRYPT_SUCCESS", dataToProtect);
}

void decryptCommand(string json)
{                              //reverses the encryption generated by encryptCommand, taking in the same input
    string dataToProtect = ""; //the data we're going to protect
    string passwordString = "";
    int currentIndexInJSON = 30;

    if (json[currentIndexInJSON] != '[')
    { //let's just make sure we're properly formatted, we're mostly assuming that, but let's be certain
        processFailure("_TARGET");
        return;
    }

    currentIndexInJSON++;
    currentIndexInJSON++; //now that we've found the [ start, let's move on to the contents, past the [ and the "

    //fill dataToProtect
    while (json[currentIndexInJSON] != '"')
    { //iterate through json until you find a "
        dataToProtect.push_back(json[currentIndexInJSON]);
        currentIndexInJSON++;
    }

    currentIndexInJSON++; //move past the closing " of the JSON's toBeAltered
    currentIndexInJSON++; //and past the ,
    currentIndexInJSON++; //and past the starting " of password

    //fill passwordString
    while (json[currentIndexInJSON] != '"')
    { //iterate through json until you find a "
        passwordString.push_back(json[currentIndexInJSON]);
        currentIndexInJSON++;
    }

    performCaesarianDecryption(dataToProtect, passwordString);

    setOutFile("DECRYPT_SUCCESS", dataToProtect);
}

void processFailure(string failureLocation)
{ //used if the input is bad, thus leading to the process failing, failureLocation is appended on to INVALID_INPUT to give some hint about what went wrong
    setOutFile("INVALID_INPUT" + failureLocation, "null");
}
