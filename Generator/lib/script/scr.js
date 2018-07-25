'use strict'
window.onload = function()
{
    let field , setControl, mo, moW, moH, cF, el;
    let arrSet = [];

    let bord =
    {
        bs      : '0px', // border size
        s       : '', // style
        c       : '#000', // color
        brAll   : '0',
        brT     : '0',
        brB     : '0',
        brR     : '0',
        brL     : '0',
    };

    let boxShadowMy =
    {
        bH      : '0',
        bV      : '0',
        bB      : '0',
        bColor  : '#000'
    };

    let bgC = 
    {
        color   : 'white',
        bgColor : '#212121'
    };

    let txtShadow = 
    {
        obj       : {},
        txtH      : '0',
        txtV      : '0',
        txtB      : '0',
        txtColor  : '#FFFFFF'
    };

    //linner-gradient
    let lG = 
    {
        cS          : '#4A148C',
        cM          : '#004D40',
        cE          : '#BF360C',
        position    : ''
    };
    let Anime = '';

    (function()
    {
        field                               = document.getElementById('field');
        setControl                          = document.getElementById('settings');
        mo                                  = document.getElementById('MO');
        cF                                  = document.getElementById('CodeField');
        txtShadow.obj                       = document.createElement('p');
        moW                                 = $('#MO').width();
        moH                                 = $('#MO').height();
        el                                  = 'element'
        mo.style.marginTop                  = '5%';
        txtShadow.obj.fontSize              = '2em';
    }())

   

    function GetRange(r, curr = 0, _min = -100)
    {
        r.type                   = 'range';
        r.min                    = _min;
        r.value                  = curr;
        r.max                    = 100;
        r.width                  = '200px';
        r.display                = 'block';
        r.style.marginLeft       = '20%';
        arrSet.push(r);
        setControl.appendChild(r);
        return r;
    }

    function GetColor(c)
    {
        c.type                   = 'color';
        c.display                = 'block';
        c.style.marginLeft       = '40%';
        arrSet.push(c);
        setControl.appendChild(c);
        return c;
    }
    function GetLabel(l, str)
    {
        l.innerText             = str;
        l.style.fontSize        = '1.1em';
        l.style.display         = 'block';
        l.style.margin          = '0 auto';
        l.style.marginTop       = '10px';
        l.style.textAlign       = 'center';
        setControl.appendChild(l);
        arrSet.push(l);
        return l;
    }

    function GetSelect(sel, arr)
    {
        for(let i = 0; i < arr.length; i++)
        {
            sel.options[i] = new Option(arr[i], arr[i]);
        }
 
        sel.style.fontSize          = '1.1em';
        sel.style.display           = 'block';
        sel.style.margin            = '0 auto';
        sel.style.marginTop         = '20px';
        setControl.appendChild(sel);
        arrSet.push(sel);
        return sel;
    }

    function GetTxt(txt)
    {
        txt.type                    = 'text';
        txt.placeholder             = 'your text';
        txt.display                 = 'block';
        txt.style.marginLeft        = '10%';
        txt.style.textAlign         = 'center';
        arrSet.push(txt);
        setControl.appendChild(txt);
        return txt;
    }

    function DelChild()
    {
        for(let i = 0; i < arrSet.length; i++)
        {
            setControl.removeChild(arrSet[i]);
        }
        arrSet = [];
    }

    function SetCode()
    {
        
        
        let str                 = '';
        let strIn               = '';
        let newStrIn            = '';
        let newStr              = '.element \n {\n';
        let n                   = txtShadow.obj.innerText == undefined ? 0 : txtShadow.obj.innerText.length;
        let nHtml               = mo.innerHTML == undefined ? 0 :  mo.innerHTML.length;
        let contextP            = txtShadow.obj.innerText == undefined ? '' : txtShadow.obj.innerText;
        let lenStyleElem        = field.innerHTML.length - 34 - nHtml;

        //elem
        for(let i = 43; i < lenStyleElem; i++)
        {
            str     += field.innerHTML[i];
        }

        str          = str.split(";");

        for(let i = 0; i < str.length; i++)
        {
            if(Anime != '')
            {
                if(i == str.length - 1)
                {
                    newStr  += 'class = \'animated ' + Anime +'\';\n';
                    i       == str.length;
                }
                else
                {
                    newStr  += str[i] + ';\n';
                }
            }
            else 
            {
                newStr  += str[i] + ';\n';     
            }
        }
        newStr      += '}\n\n';


        //text
        if(contextP != '')
        {
            for(let i = 10; i < mo.innerHTML.length - 7 - n; i++)
            {
                strIn += mo.innerHTML[i];
            }
            strIn       = strIn.split(";");
            newStrIn    = '.elementText \n {\n';
            for(let i = 0; i < strIn.length; i++)
            {
                newStrIn += strIn[i] + ';\n';     
            }

            newStrIn += 'content : \'' + contextP + '\';\n }\n';
        }

        // animate

        cF.innerText = newStr + newStrIn;
    }




/// Create menu Start
    document.getElementsByClassName('btn')[0].onclick = function()
    {
        DelChild();

        let l               = document.createElement("label");
        l                   = GetLabel(l, 'Size');
        l.style.fontSize    = '2em';

        GetLabel(document.createElement("label"), 'Width');
        let scrolW          = document.createElement("input");
        scrolW              = GetRange(scrolW);
        scrolW.oninput      = btn1Inp1;
             
        GetLabel(document.createElement("label"), 'Height');
        let scrolH          = document.createElement("input");
        scrolH              = GetRange(scrolH);
        scrolH.oninput      = btn1Inp2; 
    }

    function btn1Inp1()
    {
        mo.style.width = (moW + (moW * (this.value/100))) + 'px'; 
        SetCode();
    }
    function btn1Inp2()
    {
        mo.style.height = (moH + (moH * (this.value/100))) + 'px'; 
        SetCode();
    }





    document.getElementsByClassName('btn')[1].onclick = function()
    {
        DelChild();

        let l               = GetLabel(document.createElement("label"), 'Border');
        l.style.fontSize    = '2em';

        GetLabel(document.createElement("label"), 'Thick');
        let thick           = document.createElement("input");
        thick               = GetRange(thick, 0 , 0);
        thick.value         = bord.bs;
        thick.oninput       = btn2Inp1;

        GetLabel(document.createElement("label"), 'Style');
        let s               = document.createElement("select");
        s                   = GetSelect(s, ['','dotted', 'dashed', 'solid', 'double', 'groove', 'ridge', 'inset', 'outset']);
        s.onchange          = btn2Select1;

        GetLabel(document.createElement("label"), 'Color');
        let col             = document.createElement("input");
        col                 = GetColor(col);
        col.value           = bord.c;
        col.onchange        = btn2Color1;       
    }
    function btn2Inp1()
    {
        bord.bs = this.value
        mo.style.border     = bord.bs + 'px ' + bord.s + ' ' + bord.c ;
        SetCode(); 
    }
    function btn2Select1()
    {
        bord.s = this.options[this.selectedIndex].value;
        mo.style.border     = bord.bs + 'px ' + bord.s + ' ' + bord.c ; 
        SetCode();
    }
    function btn2Color1()
    {
        bord.c = this.value
        mo.style.border     = bord.bs + 'px ' + bord.s + ' ' + bord.c ; 
        SetCode();
    }


    document.getElementsByClassName('btn')[2].onclick = function()
    {
        DelChild();

        let l                   = document.createElement("label");
        l                       = GetLabel(l, 'Border Radius');
        l.style.fontSize        = '2em';

        GetLabel(document.createElement("label"), 'ALL');

        let brAll               = document.createElement("input");
        brAll                   = GetRange(brAll, 0, 0);
        brAll.value             = bord.brAll;
        brAll.oninput           = btn3Inp1;

        GetLabel(document.createElement("label"), 'Top');
        let brT                 = document.createElement("input");
        brT                     = GetRange(brT, 0, 0);
        brT.value               = bord.brT;
        brT.oninput             = btn3Inp2;

        GetLabel(document.createElement("label"), 'Bottom');
        let brB                 = document.createElement("input");
        brB                     = GetRange(brB, 0, 0);
        brB.value               = bord.brB;
        brB.oninput             = btn3Inp3;

        GetLabel(document.createElement("label"), 'Right');
        let brR                 = document.createElement("input");
        brR                     = GetRange(brR, 0, 0);
        brR.value               = bord.brR;
        brR.oninput             = btn3Inp4;

        GetLabel(document.createElement("label"), 'Left');
        let brL                 = document.createElement("input");
        brL                     = GetRange(brL, 0, 0);
        brL.value               = bord.brL;
        brL.oninput             = btn3Inp5;
    }
    function btn3Inp1()
    {
        bord.brAll              = this.value;
        bord.brB                = bord.brT = bord.brL = bord.brR = bord.brAll;
        mo.style.borderRadius   = bord.brAll + '% '; 
        SetCode();
    }
    function btn3Inp2()
    {
        bord.brT                = this.value;
        mo.style.borderRadius   = bord.brT + '% ' + bord.brR + '% ' + bord.brB + '% ' + bord.brL + '% '; 
        SetCode();
    }
    function btn3Inp3()
    {
        bord.brB                = this.value;
        mo.style.borderRadius   = bord.brT + '% ' + bord.brR + '% ' + bord.brB + '% ' + bord.brL + '% ';
        SetCode();
    }
    function btn3Inp4()
    {
        bord.brR                = this.value;
        mo.style.borderRadius   = bord.brT + '% ' + bord.brR + '% ' + bord.brB + '% ' + bord.brL + '% ';
        SetCode();  
    }
    function btn3Inp5()
    {
        bord.brL                = this.value;
        mo.style.borderRadius   = bord.brT + '% ' + bord.brR + '% ' + bord.brB + '% ' + bord.brL + '% '; 
        SetCode(); 
    }



    document.getElementsByClassName('btn')[3].onclick = function()
    {
        DelChild();

        let l                   = document.createElement("label");
        l                       = GetLabel(l, 'Box shadow');
        l.style.fontSize        = '2em';

        GetLabel(document.createElement("label"), 'Horizontal Length');
        let inpH                = document.createElement("input");
        inpH                    = GetRange(inpH, -100);
        inpH.value              = boxShadowMy.bH;
        inpH.oninput            = btn4Inp1;

        
        GetLabel(document.createElement("label"), 'Vertical Length');
        let inpV                = document.createElement("input");
        inpV                    = GetRange(inpV, -100);
        inpV.value              = boxShadowMy.bV;
        inpV.oninput            = btn4Inp2;

       
        GetLabel(document.createElement("label"), 'Blur Shadow');
        let inpB                = document.createElement("input");
        inpB                    = GetRange(inpB);
        inpB.value              = boxShadowMy.bB;
        inpB.oninput            = btn4Inp3;

        
        GetLabel(document.createElement("label"), 'Color Shadow');
        let col                 = document.createElement("input");
        col                     = GetColor(col);
        col.value               = boxShadowMy.bColor;
        col.onchange            = btn4Color1;  

    }
    function btn4Inp1()
    {
        boxShadowMy.bH          = this.value;
        mo.style.boxShadow      = boxShadowMy.bH + 'px ' + boxShadowMy.bV + 'px ' + boxShadowMy.bB + 'px ';
        SetCode();
    }

    function btn4Inp2()
    {
        boxShadowMy.bV          = this.value;
        mo.style.boxShadow      = boxShadowMy.bH + 'px ' + boxShadowMy.bV + 'px ' + boxShadowMy.bB + 'px ';
        SetCode();
    }
    function btn4Inp3()
    {
        boxShadowMy.bB          = this.value;
        mo.style.boxShadow      = boxShadowMy.bH + 'px ' + boxShadowMy.bV + 'px ' + boxShadowMy.bB + 'px ';
        SetCode();
    }
    function btn4Color1()
    {
        boxShadowMy.bColor      = this.value
        mo.style.color          = boxShadowMy.bColor;
        SetCode();
    }






    document.getElementsByClassName('btn')[4].onclick = function()
    {
        DelChild();

        let l                       = document.createElement("label");
        l                           = GetLabel(l, 'Background');
        l.style.fontSize            = '2em';
        
        GetLabel(document.createElement("label"), 'Color object');
        let col                     = document.createElement("input");
        col                         = GetColor(col);
        col.value                   = bgC.color;
        col.onchange                = btn5Color1;

        GetLabel(document.createElement("label"), 'Background color object');
        let bgCol                   = document.createElement("input");
        bgCol                       = GetColor(bgCol);
        bgCol.value                 = bgC.bgColor;
        bgCol.onchange              = btn5Color2;
    }
    function btn5Color1()
    {
        bgC.color                   = this.value
        mo.style.backgroundColor    = bgC.color;
        SetCode();
    }
    function btn5Color2()
    {
        bgC.bgColor                 = this.value
        field.style.backgroundColor =  bgC.bgColor;
        SetCode();
    }


    document.getElementsByClassName('btn')[5].onclick = function()
    {
        DelChild();

        let l                       = document.createElement("label");
        l                           = GetLabel(l, 'Text');
        l.style.fontSize            = '2em';
       
        GetLabel(document.createElement("label"), 'Enter the text');
        
        txtShadow.obj.style.fontSize        = '2em';
        txtShadow.obj.style.textAlign       = 'center';
        txtShadow.obj.style.paddingTop      = '25%';
        txtShadow.obj.style.color           = '#FFF';

        if(txtShadow.obj.parentNode != mo)
        {
            mo.appendChild(txtShadow.obj);
        }
       
        
        let txt                     = document.createElement("input");
        txt                         = GetTxt(txt);
        txt.onkeyup                 = btn6Txt1;
        txt.value                   = txtShadow.obj.innerText == undefined ? '' : txtShadow.obj.innerText;
        

        GetLabel(document.createElement("label"), 'Text color');

        let txtCol                  = document.createElement("input");
        txtCol                      = GetColor(txtCol);
        txtCol.value                = '#FFFFFF';
        txtCol.onchange             = btn6Color1;
        
 
        GetLabel(document.createElement("label"), 'Text size');

        let txtSize                 = document.createElement("input");
        txtSize                     = GetRange(txtSize);
        txtSize.value               = txtShadow.obj.style.fontSize;
        txtSize.oninput             = btn6Inp1;
    }
    function btn6Txt1()
    {
        txtShadow.obj.innerText     = this.value;
        SetCode();
    }
    function btn6Color1()
    {
        txtShadow.obj.style.color   = this.value;
        SetCode();
    }
    function btn6Inp1()
    {
        txtShadow.obj.style.fontSize = this.value + 'px';
        SetCode();
    }


    document.getElementsByClassName('btn')[6].onclick = function()
    {
        DelChild();

        let l               = document.createElement("label");
        l                   = GetLabel(l, 'Text Shadow');
        l.style.fontSize    = '2em';
    
        GetLabel(document.createElement("label"), 'Horizontal Length');
        let inpH            = document.createElement("input");
        inpH                = GetRange(inpH, -100);
        inpH.value          = txtShadow.txtH;
        inpH.oninput        = btn7Inp1;

        GetLabel(document.createElement("label"), 'Vertical Length');
        let inpV            = document.createElement("input");
        inpV                = GetRange(inpV, -100);
        inpV.value          = txtShadow.txtV;
        inpV.oninput        = btn7Inp2;

        GetLabel(document.createElement("label"), 'Blur Shadow');
        let inpB            = document.createElement("input");
        inpB                = GetRange(inpB);
        inpB.value          = txtShadow.txtB;
        inpB.oninput        = btn7Inp3;

        GetLabel(document.createElement("label"), 'Color Shadow');
        let col             = document.createElement("input");
        col                 = GetColor(col);
        col.value           = txtShadow.txtColor;                 
        col.onchange        = btn7Color1; 
    }
    function btn7Inp1()
    {
        txtShadow.txtH                          = this.value;
        txtShadow.obj.style.textShadow          = txtShadow.txtH + 'px ' + txtShadow.txtV + 'px ' + txtShadow.txtB + 'px ' + txtShadow.txtColor;
        SetCode();
    }

    function btn7Inp2()
    {
        txtShadow.txtV                          = this.value;
        txtShadow.obj.style.textShadow          = txtShadow.txtH + 'px ' + txtShadow.txtV + 'px ' + txtShadow.txtB + 'px ' + txtShadow.txtColor;
        SetCode();
    }
    function btn7Inp3()
    {
        txtShadow.txtB                          = this.value;
        txtShadow.obj.style.textShadow          = txtShadow.txtH + 'px ' + txtShadow.txtV + 'px ' + txtShadow.txtB + 'px ' + txtShadow.txtColor;
        SetCode();
    }
    function btn7Color1()
    {
        txtShadow.txtColor                      = this.value
        txtShadow.obj.style.textShadow          = txtShadow.txtH + 'px ' + txtShadow.txtV + 'px ' + txtShadow.txtB + 'px ' + txtShadow.txtColor;
        SetCode();
    }

    document.getElementsByClassName('btn')[7].onclick = function()
    {
        DelChild();

        let l               = document.createElement("label");
        l                   = GetLabel(l, 'Gradient');
        l.style.fontSize    = '2em';

        GetLabel(document.createElement("label"), 'start middle end');
        let col1             = document.createElement("input");
        col1                 = GetColor(col1);
        col1.value           = lG.cS;
        col1.onchange        = btn8Color1; 
          
        let col2             = document.createElement("input");
        col2                 = GetColor(col2);
        col2.value           = lG.cM;
        col2.onchange        = btn8Color2; 

        let col3             = document.createElement("input");
        col3                 = GetColor(col3);
        col3.value           = lG.cE;
        col3.onchange        = btn8Color3; 

        GetLabel(document.createElement("label"), 'Position');
        let s               = document.createElement("select");
        s                   = GetSelect(s, ['','top', 'bottom', 'left', 'right', 'center']);
        s.onchange          = btn8Select1;

    }
    function btn8Color1()
    {
        lG.cS                      = this.value;
        ApplyLG();
    }
    function btn8Color2()
    {
        lG.cM                      = this.value;
        ApplyLG();
    }
    function btn8Color3()
    {
        lG.cE                      = this.value;
        ApplyLG();
    }
    function btn8Select1()
    {
        lG.position = this.options[this.selectedIndex].value;
        ApplyLG();
    }
    function ApplyLG()
    {
        if(lG.position == 'center')
        {
            mo.style.background = 'radial-gradient(ellipse at ' + lG.position + ', '+ lG.cS +' 33%, ' + lG.cM +' 71%, '  + lG.cE + ' 100%)';
        } 
        else
        {
            mo.style.background = 'linear-gradient(to ' + lG.position + ', '+ lG.cS +' 33%, ' + lG.cM +' 71%, '  + lG.cE + ' 100%)';
        }
        SetCode();
    }

    document.getElementsByClassName('btn')[8].onclick = function()
    {
        DelChild();

        let l               = document.createElement("label");
        l                   = GetLabel(l, 'Animation css');
        l.style.fontSize    = '2em';

        GetLabel(document.createElement("label"), 'Select animation');
        let s               = document.createElement("select");
        s                   = GetSelect(s, ['',
        'bounce', 'flash', 'pulse', 'rubberBand', 'shake',
        'headShake', 'swing','tada','wobble','jello','bounceIn',
        'bounceInDown','bounceInLeft','bounceInRight','bounceInUp',
        'bounceOut','bounceOutLeft','bounceOutRight','bounceOutUp',
        'fadeInDown','fadeInDownBig','fadeInLeft','fadeInLeftBig','fadeInRight'
        ,'fadeInRightBig','fadeInUp','fadeInUpBig','fadeOut',
        'fadeOutDown','fadeOutDownBig','fadeOutLeft','fadeOutLeftBig',
        'fadeOutRight','fadeOutRightBig','fadeOutUp','flipInX'
        ,'flipInY','flipOutX','flipOutY','lightSpeedIn','lightSpeedOut',
        'rotateIn','rotateInDownLeft','rotateInDownRight','rotateInUpLeft',
        'rotateInUpRight','rotateOut','rotateOutDownLeft','rotateOutDownRight',
        'rotateOutUpLeft','rotateOutUpRight','hinge','jackInTheBox','rollIn',
        'rollOut','zoomIn']); 

        if(Anime != undefined)
        {
            s.options.value     = Anime;
        }
        s.onchange              = btn9Select1;
    }
    function btn9Select1()
    {
        if(Anime != '')
        {
            mo.classList.remove(Anime);
        }
        Anime = this.options[this.selectedIndex].value;
        mo.classList.add('animated'); 
        mo.classList.add(Anime);
        ApplyLG();
    }


    document.getElementsByClassName('btn')[9].onclick = function()
    {
        DelChild();
        arrSet = [];

        bord = 
        {
            bs      : '0px', // border size
            s       : '', // style
            c       : '#000', // color
            brAll   : '0',
            brT     : '0',
            brB     : '0',
            brR     : '0',
            brL     : '0',
        };

        boxShadowMy =
        {
            bH      : '0',
            bV      : '0',
            bB      : '0',
            bColor  : '#000'
        };
        bgC = 
        {
            color   : 'white',
            bgColor : '#212121'
        };
        
        lG = 
        {
            cS : '#4A148C',
            cM : '#004D40',
            cE : '#BF360C',
            position : ''
        };
        Anime = '';

        field.style.background              = '#FFFFFF';
        field.style.backgroundColor         = '#FFFFFF'; 

        mo.style.background                 = '#212121';
        mo.style.width                      = moW + 'px';
        mo.style.height                     = moH + 'px'; 
        mo.style.border                     = 'none';
        mo.style.borderRadius               = '0px';
        mo.style.boxShadow                  = 'none';

        cF.innerText                        = '';                                   
        txtShadow.obj.style.fontSize        = '2em';
        txtShadow.obj.style.color           = '#FFFFFF'; 
        txtShadow.obj.innerText             = '';
        txtShadow.obj.fontSize              = '2em';
    }
   
/// Create menu End




var colors = new Array(
    [224, 224, 224],
    [194, 24, 91],
    [13,71,161],
    [0,0,0]);
  
  var step = 0;
  var colorIndices = [0,1,2,3];
  
  //transition speed
  var gradientSpeed = 0.002;
  
  function updateGradient()
  {
    
        if ( $===undefined ) return;
        
    var c0_0 = colors[colorIndices[0]];
    var c0_1 = colors[colorIndices[1]];
    var c1_0 = colors[colorIndices[2]];
    var c1_1 = colors[colorIndices[3]];
    
    var istep = 1 - step;
    var r1 = Math.round(istep * c0_0[0] + step * c0_1[0]);
    var g1 = Math.round(istep * c0_0[1] + step * c0_1[1]);
    var b1 = Math.round(istep * c0_0[2] + step * c0_1[2]);
    var color1 = "rgb("+r1+","+g1+","+b1+")";
    
    var r2 = Math.round(istep * c1_0[0] + step * c1_1[0]);
    var g2 = Math.round(istep * c1_0[1] + step * c1_1[1]);
    var b2 = Math.round(istep * c1_0[2] + step * c1_1[2]);
    var color2 = "rgb("+r2+","+g2+","+b2+")";
    
    $('#gradient').css({
        background: "-webkit-gradient(linear, left top, right top, from("+color1+"), to("+color2+"))"}).css({
        background: "-moz-linear-gradient(left, "+color1+" 0%, "+color2+" 100%)"});
        
        step += gradientSpeed;
        if ( step >= 1 )
        {
        step %= 1;
        colorIndices[0] = colorIndices[1];
        colorIndices[2] = colorIndices[3];
        
        //pick two new target color indices
        //do not pick the same as the current one
        colorIndices[1] = ( colorIndices[1] + Math.floor( 1 + Math.random() * (colors.length - 1))) % colors.length;
        colorIndices[3] = ( colorIndices[3] + Math.floor( 1 + Math.random() * (colors.length - 1))) % colors.length;
        
        }
  }
  
  setInterval(updateGradient,10);


}