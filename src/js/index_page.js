async function loadFileList() {
    const res = await fetch('/api/list');
    const text = await res.text();

    if (!text.trim()) {
        console.error('Empty response from /api/list');
        return;
    }

    let files;
    try {
        files = JSON.parse(text);
    } catch (err) {
        console.error('Invalid JSON from /api/list:', text);
        return;
    }

    const select = document.getElementById('fileList');
    select.innerHTML = '';

    files.forEach(name => {
        const opt = document.createElement('option');
        opt.value = '/src/data/' + name;
        opt.textContent = name;
        select.appendChild(opt);
    });
}


async function loadSelectedFile() {
    const fileUrl = document.getElementById('fileList').value;
    if (!fileUrl) return;


    const res = await fetch(fileUrl);
    const contentType = res.headers.get('content-type') || '';


    // 응답이 JSON이 아닌 경우 HTML(에러 페이지 등)이 반환되어 parse 오류 발생
    if (!contentType.includes('application/json')) {
        const txt = await res.text();
        document.getElementById('output').textContent = 'Error: expected JSON but received: ' + txt.slice(0,1000);
        return;
    }


    const json = await res.json();
    document.getElementById('output').textContent = JSON.stringify(json, null, 2);
}


window.onload = loadFileList;