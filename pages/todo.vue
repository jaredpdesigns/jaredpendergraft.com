<template>
  <main :class="$options.name" @keyup.esc="clearAddNew">
    <header v-if="addNew" :class="$options.name + '__header'">
      <section
        class="border__top color__bg--contrast color__border--base--light padding__bottom--m padding__left--m padding__right--m padding__top--xl shadow width__ml"
      >
        <button @click="clearAddNew">
          <Icon
            class="color__type--base--semi radius--s"
            name="cancel"
            :size="14"
          />
        </button>
        <input
          aria-label="Add new"
          type="text"
          placeholder="Something great…"
          v-model="newItem"
          class="padding__left--m padding__right--m"
          ref="newItemInput"
          @change="newToDo"
        />
        <button
          @click="newToDo"
          class="padding__left--m padding__right--m type__size--ml-l"
        >
          <Icon
            class="color__type--base--semi margin__right--s"
            name="check"
            :size="14"
          />Done
        </button>
      </section>
    </header>
    <article class="oomph__v--l width__xxl">
      <section
        :class="[
          $options.name + '__lists',
          'padding__left--m padding__right--m',
        ]"
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
              :id="index"
              :class="[
                $options.name + '__item',
                'border__bottom color__border--base--light padding__all--s',
              ]"
              v-for="(todo, index) in active"
              :key="index"
              draggable
              @dragstart="onDragStart"
              @drop="onDrop($event, active)"
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
                  class="color__type--base--semi type__size--m-l"
                  @click="active = active.filter((item) => item !== todo)"
                >
                  <Icon name="cancel" :size="14" />
                </button>
                <Icon
                  class="color__type--base--semi margin__left--s"
                  name="drag"
                  :size="16"
                />
              </label>
            </section>
          </section>
        </section>
        <section>
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
                'border__bottom color__border--base--light padding__all--s',
              ]"
              v-for="todo in done"
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
                  class="color__type--base--semi type__size--m-l"
                  @click="done = done.filter((item) => item !== todo)"
                >
                  <Icon name="cancel" :size="14" />
                </button>
              </label>
            </section>
          </section>
        </section>
      </section>
      <p
        v-else
        class="color__type--base--mid type__align--center type__family--script type__size--m-l"
      >
        Woo-hoo, no ToDos to be done!
      </p>
    </article>
    <footer
      :class="[
        $options.name + '__footer',
        'border__top color__bg--contrast color__border--base--light type__align--center',
      ]"
    >
      <button
        class="padding__left--m padding__right--m type__size--ml-l"
        @click="addNewItem"
      >
        <Icon
          class="color__type--base--semi margin__right--s"
          name="add"
          :size="14"
        />Add New
      </button>
      <button
        v-if="active.length || done.length"
        @click="clearAll"
        class="padding__left--m padding__right--m type__size--ml-l"
      >
        <Icon
          class="color__type--base--semi margin__right--s"
          name="minus"
          :size="14"
        />Clear All
      </button>
    </footer>
  </main>
</template>
<script>
export default {
  name: "ToDo",
  data() {
    return {
      active: [],
      addNew: false,
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
    addNewItem() {
      this.addNew = true;
      setTimeout(() => {
        this.$refs.newItemInput.focus();
      });
    },
    clearAddNew() {
      this.addNew = false;
      this.newItem = "";
    },
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
        this.clearAddNew();
      }
    },
    onDragStart(event) {
      event.dataTransfer.setData("text/plain", event.target.id);
    },
    onDrop(event, arr) {
      const from = event.dataTransfer.getData("text");
      const to = event.target.id;
      const item = arr.splice(from, 1);
      arr.splice(to, 0, item[0]);
    },
    test() {
      alert("Testing!");
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
  article {
    padding-bottom: calc(var(--size__xxxl) + var(--size__l));
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
    align-items: flex-end;
    background-color: rgba(white, 0.125);
    backdrop-filter: blur(8px);
    display: flex;
    height: calc(100% - var(--size__xxxl));
    left: 0;
    position: fixed;
    top: 0;
    width: 100%;
    z-index: 100;
    [data-theme="dark"] & {
      background-color: hsla(218, 12%, 16%, 0.125);
    }
    @include breakpoint(xsl) {
      align-items: center;
      height: 100%;
    }
    > section {
      align-items: center;
      display: flex;
      flex-wrap: wrap;
      justify-content: center;
      position: relative;
      @include breakpoint(xsl) {
        border: var(--size__xxs) solid var(--color__base--light);
        border-radius: var(--size__s);
        flex-wrap: nowrap;
        justify-content: space-between;
        padding-right: 0;
      }
    }
    input[type="text"] {
      @include smooth;
      background-color: var(--color__contrast);
      border: var(--size__xxs) solid var(--color__base--light);
      border-radius: var(--size__s);
      height: var(--size__xxl);
      flex-grow: 1;
      font-size: var(--typeSize__ml);
      line-height: var(--typeLineheight__l);
      &::placeholder {
        color: var(--color__base--semi);
      }
      &:focus,
      &:hover {
        border-color: var(--color__base--semi);
      }
    }
    button {
      &:first-child {
        align-items: center;
        display: inline-flex;
        height: var(--size__xl);
        left: 0;
        justify-content: center;
        position: absolute;
        top: 0;
        width: var(--size__xl);
      }
      &:last-child {
        flex-shrink: 0;
        margin-top: var(--size__m);
        @include breakpoint(xsl) {
          margin-top: 0;
        }
      }
    }
  }
  &__footer {
    bottom: var(--size__xxxl);
    align-items: center;
    display: flex;
    height: var(--size__xxxl);
    justify-content: center;
    left: 0;
    position: fixed;
    right: 0;
    @include breakpoint(xsl) {
      bottom: 0;
    }
  }
  &__lists {
    display: grid;
    grid-gap: var(--size__l);
    @media (orientation: landscape) {
      grid-template-columns: 1fr 1fr;
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
          background-color: var(--color__base--light);
          border-color: var(--color__base--light);
          color: var(--color__base--mid);
        }
        p {
          opacity: 0.5;
          text-decoration: line-through;
        }
      }
      &:focus + label span {
        background-color: var(--color__contrast);
      }
      &:focus:checked + label span {
        background-color: var(--color__base--semi);
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
        top: calc(var(--size__s) + var(--size__xs));
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
