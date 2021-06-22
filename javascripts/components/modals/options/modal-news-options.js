"use strict";

Vue.component("modal-news-options", {
  mixins: [modalOptionsMixin],
  data() {
    return {
      enabled: false,
      repeatBuffer: 40,
      AIChance: 0,
      speed: 1
    };
  },
  watch: {
    type(newValue) {
      player.options.news.type = newValue;
    },
    repeatBuffer(newValue) {
      player.options.news.repeatBuffer = parseInt(newValue, 10);
    },
    AIChance(newValue) {
      player.options.news.AIChance = parseFloat(newValue, 10);
    },
    speed(newValue) {
      player.options.news.speed = parseFloat(newValue, 10);
    },
  },
  computed: {
    newsOnOffLabel() {
      return `News: ${this.enabled ? "On" : "Off"}`;
    }
  },
  methods: {
    update() {
      const options = player.options.news;
      this.enabled = options.enabled;
      this.repeatBuffer = options.repeatBuffer;
      this.AIChance = options.AIChance;
      this.speed = options.speed;
    }
  },
  template: `
    <modal-options @close="emitClose">
      <primary-button
        class="o-primary-btn--option"
        onclick="GameOptions.toggleNews()"
      >
        {{ newsOnOffLabel }}
      </primary-button>
      <div class="o-primary-btn o-primary-btn--option o-primary-btn--slider">
        <b>{{ formatInt(parseInt(repeatBuffer)) }} message repeat buffer</b>
        <input
          v-model="repeatBuffer"
          class="o-primary-btn--slider__slider"
          type="range"
          min="0"
          step="1"
          max="80"
        />
      </div>
      <div class="o-primary-btn o-primary-btn--option o-primary-btn--slider">
        <b>{{ formatPercents(parseFloat(AIChance)) }} AI messages</b>
        <input
          v-model="AIChance"
          class="o-primary-btn--slider__slider"
          type="range"
          min="0"
          step="0.01"
          max="1"
        />
      </div>
      <div class="o-primary-btn o-primary-btn--option o-primary-btn--slider">
        <b>{{ formatPercents(parseFloat(speed)) }} scroll speed</b>
        <input
          v-model="speed"
          class="o-primary-btn--slider__slider"
          type="range"
          min="0.5"
          step="0.01"
          max="2"
        />
      </div>
    </modal-options>`
});