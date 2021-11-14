const mainData = {
    display: {
        root: { elm: null },
        bg: { elm: null },
        text: { root: { elm: null }, elm: null, now: null, inroll: false }
    },
    chr: { elm: null, name: null },
    user: {
        name: null
    },
    player: {
        name: null
    },
    textDB: {
        raw: null,
        data: null
    }
};

function xhrParse(meth, url, data) {

    return new Promise((resolve, reject) => {

        let xhr = new XMLHttpRequest;

        xhr.open(meth ? meth : "GET", url, true);

        // 통신이 완료되어 데이터를 다 받아온 경우, 실행된다
        xhr.onload = () => {
            // status 는 HTTP 통신의 결과를 의미하며, 200 은 통신이 성공했다는 의미
            if (xhr.response) {
                console.log('dataLoaded', true);
                resolve(xhr.response); // Promise 로 결과값을 반환해준다
            } else {
                console.log('dataLoaded', "ERROR LOADING FILE!" + this);
                // alert("ERROR LOADING FILE!" + this.status);
            }
        };
        xhr.send(data);
    });
}
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
    _elm = mainData.display.root.elm;
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
    _img = mainData.chr.elm;
    if (!_img) {
        _img = document.createElement('img');
        _img.className = 'chrImg';
        _chrDisp.appendChild(_img);
        mainData.chr.elm = _img;
    }
    console.log('init', 'initialization chr image display.....done');
}
/**
 * 
 * @param {string} message text to display
 * @param {number} index startStrIndex
 * @param {*} interval set text speed.
 */
function showText(message, index, interval) {
    _isMob = document.body.clientWidth <= 720;
    _target = mainData.display.text.elm;
    brkReg = /\[(.*)\]/g;
    if (message) {
        mainData.display.text.now = message;
        mainData.display.text.inroll = true;
        if (message.includes(':')) {
            _data = message.split(':');
            _name = _data[0].trim();
            message = _data[1].trim();
            console.log(message.match(brkReg));
            if (brkReg.test(message)) {
                // for (let i in message.match(brkReg)){
                //     _data = message.match(brkReg)[i].replace(brkReg, '$1');
                //     if(_data == 'player') {
                //         message = message.replace(message.match(brkReg)[0].toString(), mainData.player.name);
                //     };
                // }
            }
            document.querySelector('.tboxWrapper #name').innerText = _name;
        }
        //letter by letter.
        if (index < message.length) {
            _target.innerHTML = _target.innerHTML + message[index++];
            setTimeout(function () { showText(message, index, interval); }, interval);
        } else {
            mainData.display.text.inroll = false;
        }
    } else {
        _target.innerHTML = '';
    }
    if (_isMob) {
        _tboxWrap = mainData.display.text.root.elm;
        _tboxWrap.style.position = 'relative';
        _tboxWrap.style.bottom = 0;
        _tboxWrap.style.width = '100%';
    }

}

function initTbox() {
    _elm = mainData.display.root.elm;
    _isMob = document.body.clientWidth <= 720;
    if (_isMob) {
        _elm = document.body;
    }
    _tboxWrap = mainData.display.text.root.elm;
    //  _elm.querySelector('div.tboxWrapper');
    if (!_tboxWrap) {
        _tboxWrap = document.createElement('div');
        _tboxWrap.className = 'tboxWrapper';
        _tbox = document.createElement('div');
        _tbox.className = 'tbox';
        _msg = document.createElement('div');
        _msg.id = 'msg';
        _msg.onclick = () => {
            console.log('next');
        }
        /*
        //next locking.
        document.querySelector('div.tboxWrapper #msg').onclick = '';
        */
        _nbox = document.createElement('a');
        _nbox.id = 'name';
        _tbox.appendChild(_msg);
        _tboxWrap.append(_nbox, _tbox)
        if (_isMob) {
            _tboxWrap.style.position = 'relative';
            _tboxWrap.style.bottom = 0;
            _tboxWrap.style.width = '100%';
        }
        _elm.append(_tboxWrap);
        mainData.display.text.root.elm = _tboxWrap;
        mainData.display.text.elm = _msg;
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
            mainData.display.bg = { name: 'room', elm: _img };
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
    mainData.display.root = { name: 'main_root', elm: _elm };
    initChrImg();
    initTbox();
    xhrParse('get', './script/main.txt').then(d => {
        mainData.textDB.raw = d.split(/\r|\n/);
        _cn = mainData.textDB.raw.find(element => element.indexOf('def chrname =') != -1).split('=')[1].trim();
        _un = mainData.textDB.raw.find(element => element.indexOf('def username =') != -1).split('=')[1].trim();
        _pn = mainData.textDB.raw.find(element => element.indexOf('def playername =') != -1).split('=')[1].trim();
        mainData.chr.name = _cn;
        mainData.user.name = _un;
        mainData.player.name = _pn;
        mainData.textDB.data = mainData.textDB.raw.filter(word => word.indexOf(':') > -1);
        console.log(mainData.textDB);
    }).then(() => scrOnload())
}

/**
 * 
 * @param {*} picName number of image or string of path
 * @description if picName is set to -1, img src is setted to be null; 
 */
function setChrImg(picName) {
    console.log('chr image display', 'setting ChrImg...');
    _elm = mainData.display.root.elm;
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

function scrOnload() {
    showText(mainData.textDB.data[0], 0, 100);
}