const autils = require('./autils');

/*
0xc855dea3
0000000000000000000000000000000000000000000000000000000000000060
0000000000000000000000006ff019415ee105acf2ac52483a33f5b43eadb8d0
0000000000000000000000000000000000000000000000000000000000000001
0000000000000000000000000000000000000000000000000000000000000001
000000000000000000000000000000000000000000000000000000000001f323
*/

exports.jewelMiningPattern = (hero1,hero2,hero3,hero4,hero5,hero6) => {
    if (hero1 === 0)
    {
        throw new Error("Tried to create a jewel mining pattern without heroes")
    }

    let rv = ""
    rv += "0xc855dea3" // start Quest
    rv += "0000000000000000000000000000000000000000000000000000000000000060" // ?
    rv += "0000000000000000000000006ff019415ee105acf2ac52483a33f5b43eadb8d0" // quest
    let heroCount = 0;
    if (hero1 > 0) { ++heroCount; }
    if (hero2 > 0) { ++heroCount; }
    if (hero3 > 0) { ++heroCount; }
    if (hero4 > 0) { ++heroCount; }
    if (hero5 > 0) { ++heroCount; }
    if (hero6 > 0) { ++heroCount; }

    rv += autils.intToInput(1); // attempts
    rv += autils.intToInput(heroCount); // hero count

    if (hero1 > 0) { rv += autils.intToInput(hero1); }
    if (hero2 > 0) { rv += autils.intToInput(hero2); }
    if (hero3 > 0) { rv += autils.intToInput(hero3); }
    if (hero4 > 0) { rv += autils.intToInput(hero4); }
    if (hero5 > 0) { rv += autils.intToInput(hero5); }
    if (hero6 > 0) { rv += autils.intToInput(hero6); }

    return rv;
}