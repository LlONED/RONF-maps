/*
*   Yep, I wrote all the code in one file. And what are you doing to me?
*/



/* Required block */

// A little syntactic sugar
function $(selector, flag) {
    if (flag) {
        return document.querySelectorAll(selector);
    }

    return document.querySelector(selector);
}

Element.prototype.attr = function (name, value) {
    if (value !== undefined) {
        this.setAttribute(name, value);
        return;
    }

    return this.getAttribute(name);
}

// Required variables
const
    version = '16853',
    maps = {
        'Wenderly Hills Hotel v. 1': {
            version: version,
            link: 'https://steamcommunity.com/sharedfiles/filedetails/?id=2690490337',
            data: {
                '1st Floor': {
                    image: 'Hotel/h1.png',
                    arr: []
                },
                '2nd Floor': {
                    image: 'Hotel/h2.png',
                    arr: []
                },
                '3nd Floor': {
                    image: 'Hotel/h3.png',
                    arr: []
                }
            }
        },
        'Wenderly Hills Hotel v. 2': {
            version: version,
            link: 'https://steamcommunity.com/sharedfiles/filedetails/?id=2693398830',
            data: {
                '1st Floor': {
                    image: 'Hotel2/f1.png',
                    arr: []
                },
                '2nd Floor': {
                    image: 'Hotel2/f2.png',
                    arr: []
                }
            }
        },
        'Penthouse': {
            version: version,
            link: 'https://steamcommunity.com/sharedfiles/filedetails/?id=2690490337',
            data: {
                'Main': {
                    image: 'Penthouse/house.png',
                    arr: []
                }
            }
        },
        'Cherryessa Farm': {
            version: version,
            link: 'https://steamcommunity.com/sharedfiles/filedetails/?id=2690490337',
            data: {
                'A Level': {
                    image: 'Farm/fa.png',
                    arr: []
                },
                'B Level': {
                    image: 'Farm/fb.png',
                    arr: []
                },
                'C Level': {
                    image: 'Farm/fc.png',
                    arr: []
                }
            }
        },
        'Gas Station': {
            version: version,
            link: 'https://steamcommunity.com/sharedfiles/filedetails/?id=2692963148',
            data: {
                'V. 1': {
                    image: 'GasStation/v1.png',
                    arr: []
                },
                'V. 2': {
                    pLink: 'https://steamcommunity.com/sharedfiles/filedetails/?id=2688966911',
                    image: 'GasStation/v2.png',
                    arr: []
                }
            }
        },
        '213 PARK HOMES': {
            version: version,
            link: 'https://steamcommunity.com/sharedfiles/filedetails/?id=2692957393',
            data: {
                'Main': {
                    image: 'Park/park.png',
                    arr: []
                }
            }
        },
        'Caesar\'s Cars Dealership': {
            version: version,
            link: 'https://steamcommunity.com/sharedfiles/filedetails/?id=2697726757',
            data: {
                '1F': {
                    image: 'Cars/c1.png',
                    arr: []
                },
                '2F': {
                    image: 'Cars/c2.png',
                    arr: []
                }
            }
        }
    },
    canvas = $('#canvas');
let d = 10;

canvas.width = canvas.clientWidth;
canvas.height = canvas.clientHeight;

const ctx = canvas.getContext('2d');



/* Functions */

function reset(flags = ['all']) {
    for (const flag of flags) {
        if (flag === 'all' || flag === 'canvas') {
            if ($('.map.active')) maps[$('.map.active').attr('data-name')].data[$('.location.active').attr('data-name')].arr = [ctx.getImageData(0, 0, canvas.width, canvas.height)];
            ctx.clearRect(0, 0, canvas.width, canvas.height);
        }

        if (flag === 'all' || flag === 'map') {
            for (const item of $('.map', true)) {
                item.classList.remove('active');
            }
        }

        if (flag === 'all' || flag === 'key') {
            for (const item of $('.keyCode', true)) {
                item.classList.remove('active');
            }
        }

        if (flag === 'all' || flag === 'locRM') {
            $('.locations').innerHTML = '';
        }

        if (flag === 'loc') {
            for (const item of $('.location', true)) {
                item.classList.remove('active');
            }
        }

        if (flag === 'all' || flag.split(':')[0] === 'cursor') {
            generateCursor($('.key', true)[0].children[0].style.color, d)
        }
    }
}

function generateCursor(color, d, stroke) {
    const cnvCursor = $('#cursorGenerator');
    cnvCursor.height = cnvCursor.width = d;
    const ctxC = cnvCursor.getContext('2d');

    ctxC.beginPath();
    ctxC.arc(d / 2, d / 2, d / 2, 0, 2 * Math.PI, false);

    if (color !== null) {
        ctxC.fillStyle = color;
        ctxC.fill();
    }

    if (stroke !== undefined) {
        ctxC.lineWidth = 2;
        ctxC.strokeStyle = stroke;
        ctxC.stroke();
    }

    canvas.style.cursor = `url(${cnvCursor.toDataURL()}), auto`;
}

function drawBuffer(imagesArr) {
    if (imagesArr.length) ctx.putImageData(imagesArr[imagesArr.length - 1], 0, 0);
}

function loadMap(name, map) {
    reset();

    const locations = Object.keys(map.data);

    canvas.style.background = `center / cover no-repeat url(./img/maps/${map.data[locations[0]].image})`;

    $('#mapName').innerHTML = `<a target="_blank" class="link--simple" href="${map.link}">${name}</a>`;
    $('.keyCode', true)[0].classList.add('active');

    for (const item of locations) {
        if (map.data[item].pLink !== undefined) $('#mapName').innerHTML = `<a target="_blank" class="link--simple" href="${map.data[item].pLink}">${name}</a>`;
        $('.locations').innerHTML += `<p class="location${locations[0] === item ? ' active' : ''}" data-name="${item}">${item}</p>`;
    }

    for (const item of $('.map', true)) {
        if (item.attr('data-name') === name) {
            item.classList.add('active');
            break;
        }
    }

    drawBuffer(map.data[locations[0]].arr);
}

function changeMap(name, map) {
    reset(['canvas', 'loc']);

    canvas.style.background = `center / cover no-repeat url(./img/maps/${map.data[name].image})`;

    (map.data[name].pLink !== undefined) ? $('#mapName').children[0].attr('href', map.data[name].pLink) : $('#mapName').children[0].attr('href', map.link);
    $(`.location[data-name="${name}"]`).classList.add('active');

    drawBuffer(map.data[name].arr);
}



/* Initializing the search block */

{
    const mapsCnt = $('#maps');

    mapsCnt.addEventListener('click', (e) => {
        if (!e.target.closest('.map') || e.target.classList.contains('active')) return;
        const name = e.target.attr('data-name') === null ? e.target.parentElement.attr('data-name') : e.target.attr('data-name');

        loadMap(name, maps[name]);
    }, true)

    // SEO suck xD
    for (const key in maps) {
        mapsCnt.innerHTML += `<div class="map" data-name="${key}"><span>${key}</span> <span>v. ${maps[key].version}</span></div>`;
    }
}



/* Initializing the Location block */

{
    const locations = $('#locations');

    locations.addEventListener('click', (e) => {
        if (!e.target.closest('.location') || e.target.classList.contains('active')) return;

        changeMap(e.target.attr('data-name'), maps[$('.map.active').attr('data-name')]);
    }, true)
}



/* Initializing the keyboard block */

{
    document.addEventListener('keypress', (e) => {
        if (e.keyCode - 48 < 0 || e.keyCode - 48 > 9) return;

        reset(['key']);

        const keys = $('.keyCode', true);
        const index = ((e.keyCode - 48) - 1 < 0) ? keys.length - 1 : e.keyCode - 48 - 1;
        const color = keys[index].previousElementSibling.style.color;

        if (color === 'rgb(255, 255, 255)') {
            generateCursor(null, 15, 'red');
            keys[index].classList.add('active');
            return;
        }

        generateCursor(color, d);
        keys[index].classList.add('active');
    });
}



/* Initializing the canvas block */

{
    let isDrawing = false;

    canvas.addEventListener('mousemove', draw);
    canvas.addEventListener('mousedown', start);
    canvas.addEventListener('mouseup', out);
    canvas.addEventListener('mouseout', out);

    function draw(e) {
        if (isDrawing) {
            const color = $('.keyCode.active').previousElementSibling.style.color;

            if (color === 'rgb(255, 255, 255)') {
                ctx.clearRect(e.clientX - canvas.offsetLeft, e.clientY - canvas.offsetTop, 15, 15);
                return;
            }
            ctx.lineTo(e.clientX - canvas.offsetLeft + 5, e.clientY - canvas.offsetTop + 5);
            ctx.strokeStyle = color;
            ctx.lineWidth = 4;
            ctx.lineCap = 'round';
            ctx.lineJoin = 'round';
            ctx.stroke();
            return;
        }
    }

    function start(e) {
        isDrawing = true;
        ctx.beginPath();
        ctx.moveTo(e.clientX - canvas.offsetLeft + 5, e.clientY - canvas.offsetTop + 5);
        e.preventDefault();
    }

    function out(e) {
        if (isDrawing) {
            isDrawing = false;
            ctx.stroke();
            ctx.closePath();
        }
    }

    $('#clear').addEventListener('click', () => {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        maps[$('.map.active').attr('data-name')].data[$('.location.active').attr('data-name')].arr = [];
    })
}

/* Final Initialization */

{
    //init map
    loadMap(Object.keys(maps)[0], maps[Object.keys(maps)[0]]);

    //init search map input
    $('#search-map').addEventListener('input', function () {

        if (this.value.length < 1) {
            for (const map of $('.map', true)) {
                map.classList.remove('hide');
            }
            return
        }

        for (const map of $('.map', true)) {
            if (map.attr('data-name').toLowerCase().search(this.value.toLowerCase()) < 0) {
                map.classList.add('hide');
                continue
            }

            map.classList.remove('hide');
        }
    });
}