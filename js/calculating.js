let currentInput = '' // 현재 값을 담을 변수
let previousInput = '' // 이전 값을 담을 변수
let operation = null; // 연산자를 담을 변수

document.addEventListener('DOMContentLoaded', () => {
    const display = document.querySelector('#display'); // input Display
    const numberButtons = document.querySelectorAll('.number'); // 숫자 버튼
    const operationButtons = document.querySelectorAll('.operation'); // 연산자 버튼
    const equalButton = document.querySelector('.equal') // 결과 버튼
    const clearButton = document.querySelector('.clear') // 비우기 버튼


    numberButtons.forEach(button => {
        button.addEventListener('click', () => {
            // 버튼 클릭시 dataset의 value값을 appendNumber 함수에 넘겨 저장한다
            appendNumber(button.dataset.value);
        })
    })

    operationButtons.forEach(button => {
        button.addEventListener('click', () => {
            // 버튼 클릭시 dataset의 value값을 appendNumber 함수에 넘겨 저장한다
            setOperation(button.dataset.value);
        })
    })

    equalButton.addEventListener('click', () => {
        // 계산 시작 
        calculate();
    })

    clearButton.addEventListener('click', () => {
        // 내용 비우기
        clearDisplay();
    })

    const appendNumber = (number) => {
        // numberButtons 클릭시 넘어오는 숫자를 currentInput에 담기
        currentInput += number;
        updateDisplay();
    }

    document.addEventListener('keydown', (e) => {
        const key = e.key;

        if(key >= 0 && key <=9) { // 0 ~ 9 키 클릭시 appendNumber함수에 key값을 전달
            appendNumber(key);
        }else if(key === '-' || key === '+' || key === '/' || key === '*') { // 연산자 +-/* 키보드 입력시 setOperation 함수에 key값 전달
            setOperation(key);
        }else if(key === 'Enter' || key === '='){
            calculate();
        }else if(key === 'Escape' || key.toLowerCase() === 'c'){ // ESC키와 영문 C를 대소문자 가리지 않고 입력시 claer함수 실행
            clearDisplay();
        }else if(key === 'Backspace') {// 백스페이스 키 입력시 함수 실행;
            deleteLastCharacter();    
        }
    })

    const setOperation = (op) => {
        // 현재 값이 비어있을 경우 리턴~
        if(currentInput === '') return;

        // 이전값, 현재값이 전부 있을경우 계산 시작
        if(previousInput !== '') calculate();

        // 받아온 연산자 값을 operation에 저장
        operation = op;
        // 연산자가 입력되면 현재 입력되어있는 값을 previousInput에 저장
        previousInput = currentInput;
        // 현재값이 저장되면 초기화
        currentInput = '';

        console.log(previousInput, currentInput);
    }

    const calculate = () => {
        let result;
        
        // 문자열을 부동소수점의 수로 변환하기 위해 parseFloat 사용
        const prev = parseFloat(previousInput);
        const current = parseFloat(currentInput);

        // 숫자로 변환할 수 없거나 숫자가 아닌경우 리턴
        if(isNaN(prev) || isNaN(current)) return;

        switch(operation){
            case '+' :
                result = prev + current;
                break;

            case '-' :
                result = prev - current;
                break;

            case '/' :
                result = prev / current;
                break;

            case '*' :
                result = prev * current;
                break;
            
            default :
                return;
        }
        
        // currentInput에 결과값 삽입
        currentInput = result;
        // 연산자 초기화
        operation = null;
        // 이전 값 초기화
        previousInput = '';
        // 디스플레이 업데이트
        updateDisplay();
        
        console.log(currentInput);

    }

    const deleteLastCharacter = () => {
        currentInput = currentInput.slice(0, -1);
        updateDisplay();
    }
    
    const clearDisplay = () => {
        currentInput = '';
        previousInput = '';
        operation = null;
        updateDisplay();
    }

    const updateDisplay = () => {
        display.value = currentInput;
    }

    
})