<template>
    <div class="wrapper">
        <div class="calculator">
            <div class="display">{{display}}</div>
            <div class="keypad">
                <div @click="reset()" class="key special_key">C</div>
                <div @click="backspace()" class="key special_key pencil">⌫</div>
                <div @click="append('÷')" class="key operator">÷</div>
                <div @click="append('×')" class="key operator last_column">×</div>
                <div @click="append('7')" class="key">7</div>
                <div @click="append('8')" class="key">8</div>
                <div @click="append('9')" class="key">9</div>
                <div @click="append('-')" class="key operator last_column">-</div>
                <div @click="append('4')" class="key">4</div>
                <div @click="append('5')" class="key">5</div>
                <div @click="append('6')" class="key">6</div>
                <div @click="append('+')" class="key operator last_column">+</div>
                <div @click="append('1')" class="key">1</div>
                <div @click="append('2')" class="key">2</div>
                <div @click="append('3')" class="key">3</div>
                <div @click="displayResult()" class="key operator double_row last_column last_row">=</div>
                <div @click="append('0')" class="key double_column last_row">0</div>
                <div @click="append('.')" class="key last_row">.</div>
            </div>
        </div>
    </div>
</template>

<script>
import { appendToExpression, evaluateExpression } from '../helpers/mathExpression'
export default {
  name: 'Calculator',
  data() {
    return {
      display: '0'
    }
  },
  methods: {
    checkIsNaN() {
        const val = this.display
        if (val !== val) {
          this.display = '0'
        }
    },
    displayResult() {
      this.display = this.result
    },
    reset() {
      this.display = '0'
    },
    backspace() {
      // replace NaN with '0'
      this.checkIsNaN(this.display)
      const expression = this.display.toString()
      const result = expression.substring(0, expression.length - 1)
      this.display = result.length === 0 ? '0' : result
    },
    append(char) {
      // replace NaN with '0'
      this.checkIsNaN(this.display)
      const expression = this.display.toString()
      // filter via custom function
      this.display = appendToExpression(expression, char)
    }
  },
  computed: {
    result() {
      if (this.display === undefined) { return NaN }
      if (this.display === '') { return '' }
      if (this.display === '0') { return '0' }
      return evaluateExpression(this.display)
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
.wrapper {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
    width: 100vw;
    -webkit-touch-callout: none;
    -webkit-user-select: none;
    -khtml-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
    touch-action: none;
}

.calculator {
    display: flex;
    flex-direction: column;
}

.display {
    flex-grow: 1;
    overflow: hidden;
    display: flex;
    flex-direction: column-reverse;
    text-align: right;
    background-color: rgb(53, 53, 53);
    color: white;
    font-size: 7vmin;
    padding: 0 3vmin;
    border-top: 1px solid rgb(31, 31, 31);
    border-left: 1px solid rgb(31, 31, 31);
    border-right: 1px solid rgb(31, 31, 31);
    -webkit-touch-callout: all;
    -webkit-user-select: all;
    -khtml-user-select: all;
    -moz-user-select: all;
    -ms-user-select: all;
    user-select: all;
    touch-action: pan-x pan-y;
}

.keypad {
    display: grid;
    grid-template: repeat(5, 7vmin) / repeat(4, 10vmin);
    font-size: 4vmin;
    touch-action: none;
}

.key {
    text-align: center;
    vertical-align: center;
    line-height: 7vmin;
    /* background-color: lightgrey; */
    background: padding-box radial-gradient(rgb(194, 194, 194), lightgrey);
    color: rgb(20, 20, 20);
    border-top: 1px solid rgb(31, 31, 31);
    border-left: 1px solid rgb(31, 31, 31);
}

.special_key {
    color: #c55a03;
}

.operator {
    /* background-color: #f98930; */
    background: padding-box radial-gradient(#fd790d, #f19447);
    color: white;
}

.last_column {
    border-right: 1px solid rgb(31, 31, 31);
}

.last_row {
    border-bottom: 1px solid rgb(31, 31, 31);
}

.double_column {
    grid-column: span 2;
}

.double_row {
    grid-row: span 2;
    line-height: 14vmin;
}

.pencil {
    font-size: 0.85em;
}

@media (min-width: 640px) {
    .calculator {
        width: 40vmin;
        height: 70vmin;
    }
}

@media (max-width: 640px) and (orientation: portrait) {
    body {
        background-color: rgb(31, 31, 31);
    }

    .wrapper {
        align-items: flex-end;
    }

    .calculator {
        width: 100vw;
        height: 100vh;
    }

    .display {
        font-size: 15vmin;
        overflow: scroll;
    }

    .keypad {
        grid-template: repeat(5, 18vmin) / repeat(4, 25vmin);
        font-size: 8vmin;
    }

    .key {
        line-height: 18vmin;
    }

    .double_row {
        line-height: 36vmin;
    }
}

@media (max-width: 640px) and (orientation: landscape) {
    body {
        background-color: rgb(31, 31, 31);
    }

    .calculator {
        flex-direction: row;
        width: 100vw;
        height: 100vh;
    }

    .display {
        font-size: 19vmin;
        overflow: scroll;
    }

    .keypad {
        grid-template: repeat(5, 20vmin) / repeat(4, 20vmin);
        font-size: 8vmin;
    }

    .key {
        line-height: 20vmin;
    }

    .double_row {
        line-height: 40vmin;
    }
}
</style>
