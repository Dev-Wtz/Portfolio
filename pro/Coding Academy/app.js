/* ==========================================================================
   ZERODAY ACADEMY // CORE APPLICATION CONTROLLER
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {

    // ----------------------------------------------------------------------
    // STATE & USER DATA
    // ----------------------------------------------------------------------
    const state = {
        userXp: 0,
        solvedQuests: new Set(),
        activeQuestId: 1,
        audioEnabled: true,
        crtEnabled: true,
        matrixEnabled: true
    };

    // Quest definitions & verification suite
    const QUESTS = {
        1: {
            title: "Quête 1 : Bypass d'Authentification",
            diff: "DÉBUTANT",
            diffClass: "easy",
            xp: 100,
            desc: 'Le système d\'accès exige un mot de passe et un jeton valide. Modifiez la fonction `verifyAccess` ci-contre pour qu\'elle renvoie `true` lorsque le mot de passe est "admin2026" OU lorsque le token est supérieur à 9000.',
            hint: "Utilisez l'opérateur logique `||` (OU) : `password === 'admin2026' || token > 9000`",
            defaultCode: `// Écrivez votre code ci-dessous
function verifyAccess(password, token) {
    // MODIFIER LA CONDITION CI-DESSOUS :
    if (password === "admin2026" || token > 9000) {
        return true;
    }
    return false;
}`,
            tests: [
                { input: ['"admin2026"', 100], expected: true },
                { input: ['"guest"', 9500], expected: true },
                { input: ['"guest"', 500], expected: false }
            ],
            validate: function(fn) {
                return (
                    fn("admin2026", 100) === true &&
                    fn("guest", 9500) === true &&
                    fn("guest", 500) === false
                );
            }
        },

        2: {
            title: "Quête 2 : Déchiffrement de Cipher César",
            diff: "INTERMÉDIAIRE",
            diffClass: "medium",
            xp: 150,
            desc: 'Un message secret a été chiffré en décalant chaque lettre de +3 positions (A->D). Complétez la fonction `decryptCaesar(text)` pour décaler chaque caractère majuscule de -3 positions (D->A, E->B).',
            hint: "Indice: Utilisez String.fromCharCode(char.charCodeAt(0) - 3) pour décaler.",
            defaultCode: `function decryptCaesar(text) {
    // Complétez le déchiffrement (décalage de -3)
    let result = "";
    for (let i = 0; i < text.length; i++) {
        let code = text.charCodeAt(i);
        result += String.fromCharCode(code - 3);
    }
    return result;
}`,
            tests: [
                { input: ['"KDFNHU"'], expected: '"HACKER"' },
                { input: ['"ZHUR"'], expected: '"ZERO"' }
            ],
            validate: function(fn) {
                return (
                    fn("KDFNHU") === "HACKER" &&
                    fn("ZHUR") === "ZERO"
                );
            }
        },

        3: {
            title: "Quête 3 : Analyseur de Logs & Extraction Regex",
            diff: "INTERMÉDIAIRE",
            diffClass: "medium",
            xp: 150,
            desc: 'Extrayez toutes les adresses IPv4 valides contenues dans un log brut. Écrivez la fonction `extractIPs(log)` qui renvoie un tableau (Array) de toutes les adresses IP trouvées.',
            hint: "Utilisez la Regex `/\\b(?:\\d{1,3}\\.){3}\\d{1,3}\\b/g` avec la méthode `log.match(...)`.",
            defaultCode: `function extractIPs(log) {
    // Extrayez les IP du texte de log avec une Regex
    const regex = /\\b(?:\\d{1,3}\\.){3}\\d{1,3}\\b/g;
    return log.match(regex) || [];
}`,
            tests: [
                { input: ['"FAIL login from 192.168.1.50 at 10:00"'], expected: '["192.168.1.50"]' }
            ],
            validate: function(fn) {
                const res = fn("FAIL login from 192.168.1.50 at 10:00 and 10.0.0.1");
                return Array.isArray(res) && res.includes("192.168.1.50") && res.includes("10.0.0.1");
            }
        },

        4: {
            title: "Quête 4 : Empreinte de Sécurité Hash Checksum",
            diff: "AVANCÉ",
            diffClass: "hard",
            xp: 200,
            desc: 'Créez un générateur d\'empreinte numérique simplifié `generateChecksum(user, secret)`. La fonction doit concaténer `user` et `secret`, puis renvoyer la somme totale des codes ASCII de chaque caractère.',
            hint: "Parcourez la chaîne `user + secret` avec une boucle et additionnez `str.charCodeAt(i)`.",
            defaultCode: `function generateChecksum(user, secret) {
    const combined = user + secret;
    let sum = 0;
    for (let i = 0; i < combined.length; i++) {
        sum += combined.charCodeAt(i);
    }
    return sum;
}`,
            tests: [
                { input: ['"admin"', '"1234"'], expected: '904' }
            ],
            validate: function(fn) {
                return fn("admin", "1234") === 904 && fn("root", "key") === 746;
            }
        },

        5: {
            title: "Quête 5 : Sanitizer d'Injection XSS",
            diff: "INTERMÉDIAIRE",
            diffClass: "medium",
            xp: 150,
            desc: 'Protégez le système contre les attaques XSS. La fonction `sanitizeInput(html)` doit remplacer tous les caractères `<` par `&lt;` et `>` par `&gt;`.',
            hint: "Utilisez `.replaceAll('<', '&lt;').replaceAll('>', '&gt;')`.",
            defaultCode: `function sanitizeInput(html) {
    // Remplacez les balises HTML < et >
    return html.replaceAll('<', '&lt;').replaceAll('>', '&gt;');
}`,
            tests: [
                { input: ['"<script>alert(1)</script>"'], expected: '"&lt;script&gt;alert(1)&lt;/script&gt;"' }
            ],
            validate: function(fn) {
                return fn("<script>alert(1)</script>") === "&lt;script&gt;alert(1)&lt;/script&gt;";
            }
        },

        6: {
            title: "Quête 6 : Patch de Défense Buffer Overflow",
            diff: "EXPERT",
            diffClass: "hard",
            xp: 250,
            desc: 'Pour éviter tout débordement de mémoire tampon (Buffer Overflow), la fonction `safeBufferWrite(maxSize, data)` doit tronquer `data` si sa longueur dépasse `maxSize`, sinon renvoyer `data` intact.',
            hint: "Utilisez `data.substring(0, maxSize)` si `data.length > maxSize`.",
            defaultCode: `function safeBufferWrite(maxSize, data) {
    if (data.length > maxSize) {
        return data.substring(0, maxSize);
    }
    return data;
}`,
            tests: [
                { input: [5, '"AAAAAA"'], expected: '"AAAAA"' },
                { input: [10, '"HELLO"'], expected: '"HELLO"' }
            ],
            validate: function(fn) {
                return fn(5, "AAAAAA") === "AAAAA" && fn(10, "HELLO") === "HELLO";
            }
        }
    };

    // ----------------------------------------------------------------------
    // AUDIO & VISUAL EFFECTS TOGGLES
    // ----------------------------------------------------------------------
    const btnAudio = document.getElementById('btn-audio');
    const audioStateSpan = document.getElementById('audio-state');
    const btnCrt = document.getElementById('btn-crt');
    const btnMatrix = document.getElementById('btn-matrix');

    btnAudio.addEventListener('click', () => {
        const active = CyberAudio.toggleMute();
        audioStateSpan.textContent = active ? 'ON' : 'OFF';
        btnAudio.classList.toggle('active', active);
    });

    btnCrt.addEventListener('click', () => {
        state.crtEnabled = !state.crtEnabled;
        document.body.classList.toggle('crt-off', !state.crtEnabled);
        btnCrt.classList.toggle('active', state.crtEnabled);
        CyberAudio.playKeyClick();
    });

    btnMatrix.addEventListener('click', () => {
        state.matrixEnabled = !state.matrixEnabled;
        document.body.classList.toggle('matrix-off', !state.matrixEnabled);
        btnMatrix.classList.toggle('active', state.matrixEnabled);
        CyberAudio.playKeyClick();
    });

    // Sound effect on keydown inside inputs/editors
    document.addEventListener('keydown', (e) => {
        if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') {
            if (e.key !== 'Enter') {
                CyberAudio.playKeyClick();
            }
        }
    });

    // ----------------------------------------------------------------------
    // HERO TERMINAL CLI ENGINE
    // ----------------------------------------------------------------------
    const termOutput = document.getElementById('terminal-output');
    const termInput = document.getElementById('terminal-input');
    const termSend = document.getElementById('terminal-send');
    const quickCmdBtns = document.querySelectorAll('.qc-btn');

    let commandHistory = [];
    let historyIndex = -1;

    function printTermLine(text, type = '') {
        const line = document.createElement('div');
        line.className = `term-line ${type}`;
        line.innerHTML = text;
        termOutput.appendChild(line);
        termOutput.scrollTop = termOutput.scrollHeight;
    }

    function processCommand(rawCmd) {
        const cmd = rawCmd.trim().toLowerCase();
        if (!cmd) return;

        commandHistory.push(rawCmd);
        historyIndex = commandHistory.length;

        printTermLine(`root@zeroday:~# ${rawCmd}`, 'user-cmd');
        CyberAudio.playExecBeep();

        switch (cmd) {
            case 'help':
                printTermLine('------------------------------------------------', 'system-msg');
                printTermLine('COMMANDES DISPONIBLES :', 'system-msg');
                printTermLine('  <span class="hl-cmd">help</span>     - Afficher ce menu d\'aide', 'system-msg');
                printTermLine('  <span class="hl-cmd">start</span>    - Lancer la 1ère quête de code CTF', 'system-msg');
                printTermLine('  <span class="hl-cmd">courses</span>  - Accéder à l\'arbre de compétences', 'system-msg');
                printTermLine('  <span class="hl-cmd">rank</span>     - Consulter votre niveau & XP actuel', 'system-msg');
                printTermLine('  <span class="hl-cmd">status</span>   - État des sous-systèmes de sécurité', 'system-msg');
                printTermLine('  <span class="hl-cmd">matrix</span>   - Basculer l\'effet de pluie Matrix', 'system-msg');
                printTermLine('  <span class="hl-cmd">clear</span>    - Nettoyer l\'écran du terminal', 'system-msg');
                printTermLine('------------------------------------------------', 'system-msg');
                break;

            case 'start':
                printTermLine('⚡ Chargement de la Quête 1 dans le Bac à Sable CTF...', 'success-msg');
                loadQuest(1);
                document.getElementById('sandbox').scrollIntoView({ behavior: 'smooth' });
                break;

            case 'courses':
                printTermLine('📂 Redirection vers l\'arbre des cours...', 'success-msg');
                document.getElementById('courses').scrollIntoView({ behavior: 'smooth' });
                break;

            case 'rank':
                const rankName = getUserRankTitle(state.userXp);
                printTermLine(`[USER STATUS] Rang: <strong style="color:#00e5ff">${rankName}</strong> | XP: <strong style="color:#00ff41">${state.userXp} XP</strong> | Récoltes: ${state.solvedQuests.size}/6`, 'system-msg');
                break;

            case 'status':
                printTermLine('✅ SYSTEM: OPERATIONAL | PORT 8080 OPEN', 'success-msg');
                printTermLine('🔒 FIREWALL: ACTIVE | AES-256 ENCRYPTION', 'system-msg');
                break;

            case 'matrix':
                btnMatrix.click();
                printTermLine(`Rain Matrix: ${state.matrixEnabled ? 'ENABLED' : 'DISABLED'}`, 'system-msg');
                break;

            case 'clear':
                termOutput.innerHTML = '';
                printTermLine('ZERODAY ACADEMY // TERMINAL CLEARED', 'system-msg');
                break;

            default:
                printTermLine(`bash: command not found: ${cmd}. Taper <span class="hl-cmd">'help'</span>.`, 'error-msg');
                CyberAudio.playError();
                break;
        }
    }

    termInput.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') {
            processCommand(termInput.value);
            termInput.value = '';
        } else if (e.key === 'ArrowUp') {
            if (historyIndex > 0) {
                historyIndex--;
                termInput.value = commandHistory[historyIndex] || '';
            }
        } else if (e.key === 'ArrowDown') {
            if (historyIndex < commandHistory.length - 1) {
                historyIndex++;
                termInput.value = commandHistory[historyIndex] || '';
            } else {
                historyIndex = commandHistory.length;
                termInput.value = '';
            }
        }
    });

    termSend.addEventListener('click', () => {
        processCommand(termInput.value);
        termInput.value = '';
    });

    quickCmdBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const cmd = btn.getAttribute('data-cmd');
            processCommand(cmd);
        });
    });

    // ----------------------------------------------------------------------
    // COURSES FILTERING & QUEST LOADING
    // ----------------------------------------------------------------------
    const filterBtns = document.querySelectorAll('.filter-btn');
    const courseCards = document.querySelectorAll('.course-card');

    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            filterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            const filter = btn.getAttribute('data-filter');

            courseCards.forEach(card => {
                const category = card.getAttribute('data-category');
                if (filter === 'all' || category === filter) {
                    card.style.display = 'flex';
                } else {
                    card.style.display = 'none';
                }
            });
            CyberAudio.playKeyClick();
        });
    });

    const loadQuestBtns = document.querySelectorAll('.load-quest-btn');
    loadQuestBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const questId = parseInt(btn.getAttribute('data-quest'));
            loadQuest(questId);
            document.getElementById('sandbox').scrollIntoView({ behavior: 'smooth' });
        });
    });

    // ----------------------------------------------------------------------
    // CTF SANDBOX CODE EDITOR & VALIDATOR
    // ----------------------------------------------------------------------
    const selectQuest = document.getElementById('select-quest');
    const questTitle = document.getElementById('quest-title');
    const questDiff = document.getElementById('quest-diff');
    const questReward = document.getElementById('quest-reward');
    const questDesc = document.getElementById('quest-desc');
    const questTests = document.getElementById('quest-tests');
    const questHint = document.getElementById('quest-hint');

    const codeInput = document.getElementById('code-input');
    const lineNumbers = document.getElementById('line-numbers');
    const btnRunCode = document.getElementById('btn-run-code');
    const btnResetCode = document.getElementById('btn-reset-code');

    const consoleStatus = document.getElementById('console-status');
    const consoleOutput = document.getElementById('console-output');

    // Update line numbers dynamically
    function updateLineNumbers() {
        const lines = codeInput.value.split('\n').length;
        let lineStr = '';
        for (let i = 1; i <= Math.max(lines, 10); i++) {
            lineStr += i + '<br>';
        }
        lineNumbers.innerHTML = lineStr;
    }

    codeInput.addEventListener('input', updateLineNumbers);

    // Support Tab key in code editor
    codeInput.addEventListener('keydown', (e) => {
        if (e.key === 'Tab') {
            e.preventDefault();
            const start = codeInput.selectionStart;
            const end = codeInput.selectionEnd;
            codeInput.value = codeInput.value.substring(0, start) + '    ' + codeInput.value.substring(end);
            codeInput.selectionStart = codeInput.selectionEnd = start + 4;
            updateLineNumbers();
        }
    });

    function loadQuest(id) {
        state.activeQuestId = id;
        selectQuest.value = id;
        const q = QUESTS[id];
        if (!q) return;

        questTitle.textContent = q.title;
        questDiff.textContent = q.diff;
        questDiff.className = `diff-level ${q.diffClass}`;
        questReward.textContent = `+${q.xp} XP`;
        questDesc.innerHTML = q.desc;
        questHint.textContent = q.hint;

        // Populate test cases
        questTests.innerHTML = '';
        q.tests.forEach(t => {
            const li = document.createElement('li');
            li.innerHTML = `<code>test(${t.input.join(', ')})</code> ➔ <span class="test-target">${t.expected}</span>`;
            questTests.appendChild(li);
        });

        codeInput.value = q.defaultCode;
        updateLineNumbers();

        consoleStatus.textContent = 'EN ATTENTE';
        consoleStatus.className = 'status-idle';
        consoleOutput.innerHTML = '<span class="output-muted">> Cliquez sur "EXÉCUTER & TESTER" pour valider.</span>';

        CyberAudio.playKeyClick();
    }

    selectQuest.addEventListener('change', (e) => {
        loadQuest(parseInt(e.target.value));
    });

    btnResetCode.addEventListener('click', () => {
        const q = QUESTS[state.activeQuestId];
        if (q) {
            codeInput.value = q.defaultCode;
            updateLineNumbers();
            CyberAudio.playKeyClick();
        }
    });

    // Execute and test user code
    btnRunCode.addEventListener('click', () => {
        const q = QUESTS[state.activeQuestId];
        if (!q) return;

        consoleStatus.textContent = 'VALIDATION...';
        consoleStatus.className = 'status-running';
        consoleOutput.innerHTML = '';

        try {
            // Safe evaluation inside Function constructor
            const userFunc = new Function(`return (${codeInput.value})`)();
            
            if (typeof userFunc !== 'function') {
                throw new Error("Aucune fonction valide retournée.");
            }

            const passed = q.validate(userFunc);

            if (passed) {
                consoleStatus.textContent = 'SUCCÈS (PASS)';
                consoleStatus.className = 'status-pass';
                consoleOutput.innerHTML = '<span class="output-pass">✓ TOUS LES TESTS SONT VALIDES ! COMPONENT SECURED.</span>';
                
                CyberAudio.playSuccess();

                // Award XP if not already solved
                if (!state.solvedQuests.has(state.activeQuestId)) {
                    state.solvedQuests.add(state.activeQuestId);
                    addXp(q.xp);
                    consoleOutput.innerHTML += `<span class="output-pass">+${q.xp} XP ACCORDÉS !</span>`;
                    
                    // Add feed log
                    addFeedItem(`Vous avez résolu la quête <strong>${q.title}</strong> (+${q.xp} XP)`);
                }
            } else {
                consoleStatus.textContent = 'ÉCHEC (FAIL)';
                consoleStatus.className = 'status-fail';
                consoleOutput.innerHTML = '<span class="output-fail">✗ Le résultat ne correspond pas aux attentes. Vérifiez la logique.</span>';
                CyberAudio.playError();
            }

        } catch (err) {
            consoleStatus.textContent = 'ERREUR DE CODE';
            consoleStatus.className = 'status-fail';
            consoleOutput.innerHTML = `<span class="output-fail">❌ Exception: ${err.message}</span>`;
            CyberAudio.playError();
        }
    });

    // ----------------------------------------------------------------------
    // SCORE, RANKS & LEADERBOARD SYSTEM
    // ----------------------------------------------------------------------
    function getUserRankTitle(xp) {
        if (xp < 150) return "SCRIPT KIDDIE";
        if (xp < 300) return "CYBER DECKER";
        if (xp < 500) return "NETRUNNER PRO";
        return "BLACK HAT ELITE";
    }

    function addXp(amount) {
        state.userXp += amount;
        document.getElementById('user-xp').textContent = `${state.userXp} XP`;
        document.getElementById('user-solved').textContent = `${state.solvedQuests.size}/6`;

        const title = getUserRankTitle(state.userXp);
        document.getElementById('user-rank').textContent = title;
        document.getElementById('lb-user-title').textContent = title;
        document.getElementById('lb-user-xp').textContent = `${state.userXp} XP`;
        document.getElementById('lb-user-quests').textContent = `${state.solvedQuests.size}/6`;

        // Update leaderboard row position dynamically
        const userRow = document.getElementById('user-leaderboard-row');
        const userPosSpan = userRow.querySelector('.user-pos');
        if (state.userXp >= 1000) {
            userPosSpan.textContent = '#4';
        } else if (state.userXp >= 300) {
            userPosSpan.textContent = '#5';
        } else {
            userPosSpan.textContent = '#6';
        }
    }

    // Dynamic feed logger
    function addFeedItem(htmlText) {
        const feedList = document.getElementById('feed-list');
        const now = new Date();
        const timeStr = now.toTimeString().split(' ')[0];

        const item = document.createElement('div');
        item.className = 'feed-item';
        item.innerHTML = `
            <span class="feed-time">${timeStr}</span>
            <span class="feed-text">${htmlText}</span>
        `;
        feedList.insertBefore(item, feedList.firstChild);
    }

    // Initialize line numbers on load
    updateLineNumbers();
});
