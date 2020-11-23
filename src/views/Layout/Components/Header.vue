<template>
  <div id="header-warp">
    <div class="pull-left header-icon" @click="Collapse">
      <svg-icon iconClass="bianji" className="bianji" />
    </div>
    <div class="pull-right">
      <div class="user-info pull-left">
        <img src="../../../assets/images/administrators.jpg" alt="" />
        {{ userName }}
      </div>
      <div class="header-icon pull-left">
        <svg-icon iconClass="exit" className="exit" />
      </div>
    </div>
  </div>
</template>

<script>
import { computed } from "@vue/composition-api";
export default {
  name: "layoutHeader",
  setup(props, { root }) {
    const Collapse = () => {
      root.$store.commit("app/SET_COLLAPSE");
    };
    const userName = computed(() => root.$store.state.app.userName);
    return {
      Collapse,
      userName,
    };
  },
};
</script>

<style lang="scss" scoped>
@import "../../../styles/config.scss";
#header-warp {
  position: fixed;
  top: 0;
  left: $navWidth;
  right: 0;
  height: 75px;
  background-color: #fff;
  line-height: 75px;
  min-width: 1300px;

  @include webkit(box-shadow, 0 3px 16px 0 rgba(0, 0, 0, 0.1));
  @include webkit(transition, all 0.3s ease 0s);
}
.open {
  #header-warp {
    left: $navWidth;
  }
}
.close {
  #header-warp {
    left: $navWidthMin;
  }
}

.header-icon {
  padding: 0 32px;
  svg {
    margin-bottom: -8px;
    font-size: 25px;
    cursor: pointer;
  }
}
.user-info {
  height: 100%;
  padding: 0 32px;
  border-right: 1px solid #ededed;
  + .header-icon {
    padding: 0 28px;
  }
  img {
    display: inline-block;
    width: 40px;
    height: 40px;
    margin-bottom: -12px;
    margin-right: 18px;
    border-radius: 50px;
  }
}
</style>