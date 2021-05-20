export function SkierCode({weight,height,skillLevel,age,footSize}){
    let weight_skierCode;
    if (weight<14 && weight>=10){
        weight_skierCode = 'A';
    }else if (weight<18 && weight>=14){
        weight_skierCode = 'B';
    }else if (weight<22 && weight>=18){
        weight_skierCode = 'C';
    }else if (weight<26 && weight>=22){
        weight_skierCode = 'D';
    }else if (weight<31 && weight>=26){
        weight_skierCode = 'E';
    }else if (weight<36 && weight>=31){
        weight_skierCode = 'F';
    }else if (weight<42 && weight>=36){
        weight_skierCode = 'G';
    }else if (weight<49 && weight>=42){
        weight_skierCode = 'H';
    }else if (weight<58 && weight>=49){
        weight_skierCode = 'I';
    }else if (weight<67 && weight>=58){
        weight_skierCode = 'J';
    }else if (weight<79 && weight>=67){
        weight_skierCode = 'K';
    }else if (weight<95 && weight>=79){
        weight_skierCode = 'L';
    }else if (weight>=95){
        weight_skierCode = 'M';
    }

    let height_skierCode;
    if (height<=148){
        height_skierCode = 'H';
    }else if (height<158 && height>148){
        height_skierCode = 'I';
    }else if (height<167 && height>=158){
        height_skierCode = 'J';
    }else if (height<179 && height>=167){
        height_skierCode = 'K';
    }else if (height<195 && height>=179){
        height_skierCode = 'L';
    }else if (height>=195){
        height_skierCode = 'M';
    }

    let temp;
    if(weight_skierCode<height_skierCode){
        temp = weight_skierCode
    }else{
        temp = height_skierCode
    }

    if (age<=50){
        if (skillLevel === 2){
            temp += 1;
        }else if (skillLevel === 3){
            temp += 2;
        }
    }else{
        temp = temp - 1;
    }

    let skierCode = temp;

    let din;

    switch (skierCode){
        case 'A':
            if (footSize<=44){
                din = 0.75;
            }else{
                din = 0;
            }
            break;
        case 'B':
            if (footSize<=36){
                din = 1;
            }else if (footSize>36&&footSize<48){
                din = 0.75;
            }else{
                din = 0;
            }
            break;
        case 'C':
            if (footSize<=36){
                din = 1.5;
            }else if (footSize>36&&footSize<44){
                din = 1.25;
            }else if (footSize>=44&&footSize<48){
                din = 1;
            }else{
                din = 0;
            }
            break;
        case 'D':
            if (footSize<=36){
                din = 2;
            }else if (footSize>36&&footSize<40){
                din = 1.75;
            }else if (footSize>=40&&footSize<48){
                din = 1.5;
            }else if (footSize>=48&&footSize<52){
                din = 1.25;
            }else{
                din = 0;
            }
            break;
        case 'E':
            if (footSize<=36){
                din = 2.5;
            }else if (footSize>36&&footSize<40){
                din = 2.25;
            }else if (footSize>=40&&footSize<44){
                din = 2;
            }else if (footSize>=44&&footSize<48){
                din = 1.75;
            }else if (footSize>=48&&footSize<56){
                din = 1.5;
            }else {
                din = 0;
            }
            break;
        case 'F':
            if (footSize<=36){
                din = 3;
            }else if (footSize>36&&footSize<40){
                din = 2.75;
            }else if (footSize>=40&&footSize<44){
                din = 2.5;
            }else if (footSize>=44&&footSize<48){
                din = 2.25;
            }else if (footSize>=48&&footSize<52){
                din = 2;
            }else if (footSize>=52&&footSize<60){
                din = 1.75;
            }else{
                din = 0;
            }
            break;
        case 'G':
            if (footSize>36&&footSize<40){
                din = 3.5;
            }else if (footSize>=40&&footSize<44){
                din = 3;
            }else if (footSize>=44&&footSize<48){
                din = 2.75;
            }else if (footSize>=48&&footSize<52){
                din = 2.5;
            }else if (footSize>=52&&footSize<56){
                din = 2.25;
            }else if (footSize>=56&&footSize<60){
                din = 2;
            }else {
                din = 0;
            }
            break;
        case 'H':
            if (footSize>=40&&footSize<44){
                din = 3.5;
            }else if (footSize>=44&&footSize<52){
                din = 3;
            }else if (footSize>=52&&footSize<56){
                din = 2.75;
            }else if (footSize>=56&&footSize<60){
                din = 2.5;
            }else {
                din = 0;
            }
            break;
        case 'I':
            if (footSize>=40&&footSize<44){
                din = 4.5;
            }else if (footSize>=44&&footSize<48){
                din = 4;
            }else if (footSize>=48&&footSize<56){
                din = 3.5;
            }else if (footSize>=56&&footSize<60){
                din = 3;
            }else {
                din = 0;
            }
            break;
        case 'J':
            if (footSize>=40&&footSize<44){
                din = 5.5;
            }else if (footSize>=44&&footSize<48){
                din = 5;
            }else if (footSize>=48&&footSize<52){
                din = 4.5;
            }else if (footSize>=52&&footSize<56){
                din = 4;
            }else if (footSize>=56&&footSize<60){
                din = 3.5;
            }else if (footSize>=60){
                din = 3;
            }else{
                din = 0;
            }
            break;
        case 'K':
            if (footSize>=40&&footSize<44){
                din = 6.5;
            }else if (footSize>=44&&footSize<48){
                din = 6;
            }else if (footSize>=48&&footSize<52){
                din = 5.5;
            }else if (footSize>=52&&footSize<56){
                din = 5;
            }else if (footSize>=56&&footSize<60){
                din = 4.5;
            }else if (footSize>=60){
                din = 4;
            }else{
                din = 0;
            }
            break;
        case 'L':
            if (footSize>=40&&footSize<44){
                din = 7.5;
            }else if (footSize>=44&&footSize<48){
                din = 7;
            }else if (footSize>=48&&footSize<52){
                din = 6.5;
            }else if (footSize>=52&&footSize<56){
                din = 6;
            }else if (footSize>=56&&footSize<60){
                din = 5.5;
            }else if (footSize>=60){
                din = 5;
            }else{
                din = 0;
            }
            break;
    }

    return din;
}