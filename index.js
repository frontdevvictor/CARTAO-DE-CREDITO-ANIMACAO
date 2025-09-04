new Vue({
  el: "#app",
  data() {
    return {
      currentCardBackground: Math.floor(Math.random() * 25 + 1),
      cardName: "",
      cardNumber: "",
      cardMonth: "",
      cardYear: "",
      cardCvv: "",
      minCardYear: new Date().getFullYear(),
      amexCardMask: "#### ###### #####",
      otherCardMask: "#### #### #### ####",
      isCardFlipped: false,
      focusElementStyle: null,
      isInputFocused: false
    };
  },
  mounted() {
    document.getElementById("cardNumber").focus();
  },
  computed: {
    getCardType() {
      const number = this.cardNumber;
      if (/^4/.test(number)) return "visa";
      if (/^(34|37)/.test(number)) return "amex";
      if (/^5[1-5]/.test(number)) return "mastercard";
      if (/^6011/.test(number)) return "discover";
      if (/^9792/.test(number)) return "troy";
      return "unknown";
    },
    generateCardNumberMask() {
      return this.getCardType === "amex" ? this.amexCardMask : this.otherCardMask;
    },
    minCardMonth() {
      if (this.cardYear == this.minCardYear) return new Date().getMonth() + 1;
      return 1;
    }
  },
  watch: {
    cardYear() {
      if (this.cardMonth < this.minCardMonth) {
        this.cardMonth = "";
      }
    }
  },
  methods: {
    flipCard(status) {
      this.isCardFlipped = status;
    },
    focusInput(e) {
      this.isInputFocused = true;
      let targetRef = e.target.dataset.ref;
      let target = this.$refs[targetRef];
      if (target) {
        this.focusElementStyle = {
          width: `${target.offsetWidth}px`,
          height: `${target.offsetHeight}px`,
          transform: `translateX(${target.offsetLeft}px) translateY(${target.offsetTop}px)`
        };
      }
    },
    blurInput() {
      this.isInputFocused = false;
      setTimeout(() => {
        if (!this.isInputFocused) {
          this.focusElementStyle = null;
        }
      }, 300);
    }
  }
});