<template>
  <main :class="$options.name">
    <article class="oomph__v--l padding__all--m width__xxl">
      <header
        :class="[
          $options.name + '__header',
          'border__bottom color__bg--contrast color__border--base--light oomph__h--m padding__left--m padding__right--m',
        ]"
      >
        <input
          aria-label="Add new ToDo"
          type="text"
          placeholder="…  "
          v-model="newItem"
          class="padding__left--m padding__right--m type__size--m-l"
          @change="newToDo"
        />
        <button
          @click="newToDo"
          class="padding__left--m padding__right--m type__size--m-l"
        >
          <Icon class="margin__right--s" name="add" :size="14" />Add New
        </button>
      </header>
      <section
        :class="$options.name + '__lists'"
        v-if="active.length || done.length"
      >
        <section>
          <p
            class="color__type--base--mid type__align--center type__family--display"
          >
            <strong>To Do</strong>
          </p>
          <section
            v-if="active.length"
            :class="[
              $options.name + '__item--wrap',
              'border__all color__bg--contrast color__border--base--light margin__top--m radius--s',
            ]"
          >
            <section
              :id="todo"
              :class="[
                $options.name + '__item',
                'border__bottom color__border--base--light padding__all--m',
              ]"
              v-for="(todo, index) in active"
              :key="todo"
              draggable
              @dragstart="onDragStart"
              @drop="onDrop"
              @dragover.prevent
              @dragenter.prevent
            >
              <input
                type="checkbox"
                name="todo"
                :id="todo"
                :value="todo"
                v-model="checked"
                @change="moveToDone"
              />
              <label :for="todo">
                <span></span>
                <p class="padding__left--m padding__right--m">
                  {{ todo }}
                </p>
                <button
                  class="type__size--m-l"
                  @click="active = active.filter((item) => item !== todo)"
                >
                  <Icon name="minus" :size="14" />
                </button>
              </label>
            </section>
          </section>
        </section>
        <section class="color__bg--contrast radius--s">
          <p
            class="color__type--base--mid type__align--center type__family--display"
          >
            <strong>Done</strong>
          </p>
          <section
            v-if="done.length"
            :class="[
              $options.name + '__item--wrap',
              'border__all color__bg--contrast color__border--base--light margin__top--m radius--s',
            ]"
          >
            <section
              :class="[
                $options.name + '__item',
                'border__bottom color__border--base--light padding__all--m',
              ]"
              v-for="(todo, index) in done"
              :key="todo"
            >
              <input
                type="checkbox"
                name="todo"
                :id="todo"
                :value="todo"
                v-model="checked"
                @change="moveToActive"
              />
              <label :for="todo">
                <span><Icon name="check" :size="14"/></span>
                <p class="padding__left--m padding__right--m">
                  {{ todo }}
                </p>
                <button
                  class="type__size--m-l"
                  @click="done = done.filter((item) => item !== todo)"
                >
                  <Icon name="minus" :size="14" />
                </button>
              </label>
            </section>
          </section>
        </section>
        <footer
          class="border__top color__bg--contrast color__border--base--light type__align--center"
        >
          <button
            v-if="active.length || done.length"
            @click="clearAll"
            class="padding__left--m padding__right--m type__size--m-l"
          >
            <Icon class="margin__right--s" name="minus" :size="14" />Clear All
          </button>
        </footer>
      </section>
      <p
        v-else
        class="color__type--base--mid type__align--center type__family--script type__size--m-l"
      >
        Woo-hoo, no ToDos to be done!
      </p>
    </article>
  </main>
</template>
<script>
export default {
  name: "ToDo",
  data() {
    return {
      active: [],
      checked: [],
      done: [],
      newItem: "",
      social: {
        title: "ToDo • Jared Pendergraft",
        description: "A browser-based ToDo list, yay!",
        image: this.$store.state.domain + "img/social.jpg",
        slug: this.$store.state.domain + "todo",
      },
    };
  },
  head() {
    return {
      title: this.social.title,
      meta: [
        {
          hid: "description",
          name: "description",
          content: this.social.description,
        },
        {
          hid: "og:description",
          property: "og:description",
          content: this.social.description,
        },
        {
          hid: "og:title",
          property: "og:title",
          content: this.social.title,
        },
        {
          hid: "og:image",
          property: "og:image",
          content: this.social.image,
        },
        {
          hid: "og:url",
          property: "og:url",
          content: this.social.slug,
        },
      ],
      link: [
        {
          hid: "canonical",
          rel: "canonical",
          href: this.social.slug,
        },
      ],
    };
  },
  methods: {
    clearAll() {
      this.active = [];
      this.done = [];
      localStorage.removeItem("active");
      localStorage.removeItem("checked");
      localStorage.removeItem("done");
    },
    moveToActive(event) {
      let item = event.target.value;
      let filtered = this.done.filter((todo) => todo !== item);
      setTimeout(() => {
        this.active.push(item);
        this.done = filtered;
      }, 500);
    },
    moveToDone(event) {
      let item = event.target.value;
      let filtered = this.active.filter((todo) => todo !== item);
      setTimeout(() => {
        this.done.push(item);
        this.active = filtered;
      }, 500);
    },
    newToDo() {
      if (this.newItem) {
        this.active.push(this.newItem);
        this.newItem = "";
      }
    },
    onDragStart(event) {
      event.dataTransfer.setData("text/plain", event.target.id);
    },
    onDrop(event) {
      const id = this.active.indexOf(event.dataTransfer.getData("text"));
      const before = [];
      const after = this.active.slice(id);
      console.log(after);
    },
  },
  mounted() {
    this.active = JSON.parse(localStorage.getItem("active")) || [];
    this.checked = JSON.parse(localStorage.getItem("checked")) || [];
    this.done = JSON.parse(localStorage.getItem("done")) || [];
  },
  watch: {
    active(newValue, oldValue) {
      localStorage.setItem("active", JSON.stringify(newValue));
    },
    checked(newValue, oldValue) {
      localStorage.setItem("checked", JSON.stringify(newValue));
    },
    done(newValue, oldValue) {
      localStorage.setItem("done", JSON.stringify(newValue));
    },
  },
};
</script>
<style lang="scss">
.ToDo {
  --fixedHeight: calc(var(--size__xxxl) + var(--size__l));
  article {
    padding-top: var(--fixedHeight);
    @include breakpoint(xsl) {
      padding-left: var(--size__l);
      padding-right: var(--size__l);
    }
    @include breakpoint(xl) {
      padding-left: 0;
      padding-right: 0;
    }
  }
  button {
    @include smooth;
    align-items: center;
    display: inline-flex;
    font-weight: 600;
    flex-shrink: 0;
    &:focus,
    &:hover {
      color: var(--color__base--mid);
    }
  }
  &__header {
    align-items: center;
    display: flex;
    height: var(--fixedHeight);
    left: 0;
    position: fixed;
    right: 0;
    top: 0;
    @include breakpoint(xsl) {
      padding-left: var(--size__l);
      padding-right: var(--size__l);
    }
    > * {
      height: var(--size__xxl);
    }
    input[type="text"] {
      @include smooth;
      background-color: transparent;
      border: var(--size__xxs) solid var(--color__base--light);
      border-radius: var(--size__s);
      &::placeholder {
        color: var(--color__base--semi);
      }
      &:focus,
      &:hover {
        border-color: var(--color__base--semi);
      }
    }
  }
  &__lists {
    display: grid;
    @media (orientation: landscape) {
      grid-template-columns: 1fr 1fr;
    }
    footer {
      bottom: 0;
      align-items: center;
      display: flex;
      height: var(--size__xxxl);
      justify-content: center;
      left: 0;
      position: fixed;
      right: 0;
    }
  }
  &__item {
    align-items: flex-start;
    display: flex;
    position: relative;
    &:hover input[type="checkbox"] + label span {
      border-color: var(--color__base--semi);
    }
    &:focus-within {
      background-color: var(--color__secondary);
    }
    &:last-child {
      border-bottom: none;
    }
    input[type="checkbox"] {
      height: var(--size__l);
      width: var(--size__l);
      opacity: 0;
      &:checked + label {
        span {
          background-color: var(--color__brand);
          border-color: var(--color__brand);
          color: white;
        }
        p {
          opacity: 0.5;
          text-decoration: line-through;
        }
      }
      &:disabled + label span {
        border-color: var(--color__base--light);
      }
      &:disabled + label span,
      &:focus + label span {
        background-color: var(--color__contrast);
      }
      &:focus:checked + label span {
        background-color: var(--color__brand);
        box-shadow: 0 0 0 var(--size__xs) var(--color__base--ghost);
      }
    }
    label {
      align-items: center;
      flex-grow: 1;
      display: flex;
      span {
        @include smooth;
        align-items: center;
        border: var(--size__xxs) solid var(--color__base--light);
        border-radius: var(--size__s);
        cursor: pointer;
        display: inline-flex;
        height: var(--size__l);
        justify-content: center;
        position: absolute;
        left: var(--size__m);
        top: calc(var(--size__m) + var(--size__xs));
        width: var(--size__l);
      }
      p {
        flex-grow: 1;
      }
      button {
        align-items: center;
        border-radius: 50%;
        display: inline-flex;
        height: var(--size__xl);
        justify-content: center;
        width: var(--size__xl);
        &:focus,
        &:hover {
          background-color: var(--color__contrast);
        }
        &:focus-visible {
          box-shadow: 0;
        }
      }
    }
  }
}
</style>
