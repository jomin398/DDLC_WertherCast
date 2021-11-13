

function onPageError(headMsg, cbf) {
    _elm = document.body.querySelector('body div.main');
    if (_elm) { _elm.remove() } else {
        _elm = document.createElement('div');
        _elm.className = 'main';
        if (headMsg) {
            _h = document.createElement('h2');
            _h.className = 'stripe-2';
            _h.innerText = headMsg;
            _elm.appendChild(_h);
        }

        document.body.appendChild(_elm);
        if (cbf) { cbf() };
    }
};
function mkChoicesBox(msg, btns) {
    _Cbox = document.createElement('div');
    _Cbox.className = 'modal main';
    _p = document.createElement('p');
    _p.innerText = msg;
    _Cbox.appendChild(_p);
    document.querySelector('body div.main').appendChild(_Cbox)

    for (let i = 0, l = btns.length; i < l; i++) {
        e = btns[i];
        _a = document.createElement('a');
        _a.innerText = e[0];
        _a.href = e[1];
        _Cbox.append(_a);
        if (i != l) {
            _Cbox.append(document.createElement('br'))
        }
    };
}
function initChrImg() {
    console.log('init', 'initialization chr image display.....');
    _elm = document.querySelector('body div.main');
    _chrDisp = _elm.querySelector('div.chrDisp');
    if (!_chrDisp) {
        _chrDisp = document.createElement('div');
        _chrDisp.className = 'chrDisp';
        _chrDisp.onclick = () => {
            var x = document.querySelector('body div.tboxWrapper');
            if (x.style.display === "none") {
                x.style.display = "block";
            } else {
                x.style.display = "none";
            }
        }

        _elm.append(_chrDisp);
    }
    _img = _chrDisp.querySelector('img.chrImg');
    if (!_img) {
        _img = document.createElement('img');
        _img.className = 'chrImg';
        _chrDisp.appendChild(_img);

    }
    console.log('init', 'initialization chr image display.....done');
}
/**
 * 
 * @param {string} target querySelector string 
 * @param {string} message text to display
 * @param {number} index startStrIndex
 * @param {*} interval set text speed.
 */
function showText(target, message, index, interval) {
    _isMob = document.body.clientWidth <= 720;
    if (message) {
        if (message.includes(':')) {
            _data = message.split(':');
            _name = _data[0].trim();
            message = _data[1].trim();
            document.querySelector('.tboxWrapper #name').innerText = _name;
        }
        //letter by letter.
        if (index < message.length) {
            document.querySelector(target).innerHTML =
                document.querySelector(target).innerHTML + message[index++];
            setTimeout(function () { showText(target, message, index, interval); }, interval);
        }
    } else {
        document.querySelector(target).innerHTML = '';
    }
    if (_isMob) {
        _tboxWrap = document.querySelector('body div.tboxWrapper');
        _tboxWrap.style.position = 'relative';
        _tboxWrap.style.bottom = 0;
    }

}

function initTbox() {
    _elm = document.querySelector('body div.main');
    _isMob = document.body.clientWidth <= 720;
    if (_isMob) {
        _elm = document.body;
    }
    _tboxWrap = _elm.querySelector('div.tboxWrapper');
    if (!_tboxWrap) {
        _tboxWrap = document.createElement('div');
        _tboxWrap.className = 'tboxWrapper';
        _tbox = document.createElement('div');
        _tbox.id = 'msg';
        _tbox.onclick = () => {
            console.log('next');
        }

        /*
        //next locking.
        document.querySelector('div.tboxWrapper #msg').onclick = '';
        */
        _nbox = document.createElement('div');
        _nbox.id = 'name';

        _tboxWrap.append(_nbox, _tbox)
        if (_isMob) {
            _tboxWrap.style.position = 'relative';
            _tboxWrap.style.bottom = 0;
        }
        _elm.append(_tboxWrap);
    }
}

function pageInit() {
    _elm = document.createElement('div');
    _elm.className = 'main';
    _elm.style.position = 'relative';
    for (i = 0; i < 2; i++) {
        _img = document.createElement('img');
        _img.id = 'bgImg_' + i;
        _img.className = 'bgImg';
        if (i == 0) {
            _img.style.zIndex = -1;
        } else {
            _img.style.zIndex = i;
        }
        if (i == 1) {
            _img.style.position = 'absolute';
            _img.style.top = 0;
            _img.style.margin = 0;
        };
        _img.src = ['./image/cg/room_highlight.png', './image/cg/FinaleFG.png'][i];
        _elm.append(_img)
    }
    document.body.appendChild(_elm);
    initChrImg();
    initTbox();
    showText(".tboxWrapper #msg", "모니카 : 안녕? \"Player\"..!", 0, 100);
}

/**
 * 
 * @param {*} picName number of image or string of path
 * @description if picName is set to -1, img src is setted to be null; 
 */
function setChrImg(picName) {
    console.log('chr image display', 'setting ChrImg...');
    _elm = document.querySelector('body div.main');
    _chrDisp = _elm.querySelector('div.chrDisp');
    if (!_elm | !_chrDisp) {
        initChrImg();
    }
    _p = null;

    if (typeof picName == 'string') {
        _p = picName;
    } else if (typeof picName == 'number') {
        _p = 'monika_' + picName;
    }
    else {
        _p = 'monika_0';
    }
    _n = parseInt(_p.split('_')[1]);
    console.log('chr image display', 'recived num : ' + _n);
    switch (_n) {
        case 2:
        case 3:
        case 4:
        case 5:
            _img.style.width = '66%';
            break;
        case 6:
            _img.style.width = '51%';
            break;
        case 8:
            _img.style.width = '49%';
            break;
        case 9:
            _img.style.width = '52%';
            break;
        default:
            _img.style.width = '50%';
    }
    if (_n != -1) {
        _img.src = './image/chr/' + _p + '.png';
    } else if (_n == -1) {
        _img.src = '';
    }
}

window.onload = () => {
    // onPageError("점검 중 !!", () => {
    //     mkChoicesBox('미안해....', [
    //         ['알았어', 'javascript:document.location.reload();'],
    //         ['괜찮아...', "javascript:console.log('hello.');"]
    //     ]);
    // });
    pageInit();
    setChrImg('monika_0')
};