"use strict";
function domReady(condition = ["complete", "interactive"]) {
  return new Promise((resolve) => {
    if (condition.includes(document.readyState)) {
      resolve(true);
    } else {
      document.addEventListener("readystatechange", () => {
        if (condition.includes(document.readyState)) {
          resolve(true);
        }
      });
    }
  });
}
const safeDOM = {
  append(parent, child) {
    if (!Array.from(parent.children).find((e) => e === child)) {
      return parent.appendChild(child);
    }
  },
  remove(parent, child) {
    if (Array.from(parent.children).find((e) => e === child)) {
      return parent.removeChild(child);
    }
  }
};
function useLoading() {
  const className = `loaders-css__square-spin`;
  const styleContent = `
  @keyframes square-spin {
    25% { transform: perspective(100px) rotateX(180deg) rotateY(0); }
    50% { transform: perspective(100px) rotateX(180deg) rotateY(180deg); }
    75% { transform: perspective(100px) rotateX(0) rotateY(180deg); }
    100% { transform: perspective(100px) rotateX(0) rotateY(0); }
  }
  .${className} > div {
    animation-fill-mode: both;
    width: 50px;
    height: 50px;
    background: #fff;
    animation: square-spin 3s 0s cubic-bezier(0.09, 0.57, 0.49, 0.9) infinite;
  }
  .app-loading-wrap {
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
    background: #282c34;
    z-index: 9;
  }
      `;
  const oStyle = document.createElement("style");
  const oDiv = document.createElement("div");
  oStyle.id = "app-loading-style";
  oStyle.innerHTML = styleContent;
  oDiv.className = "app-loading-wrap";
  oDiv.innerHTML = `<div class="${className}"><div></div></div>`;
  return {
    appendLoading() {
      safeDOM.append(document.head, oStyle);
      safeDOM.append(document.body, oDiv);
    },
    removeLoading() {
      safeDOM.remove(document.head, oStyle);
      safeDOM.remove(document.body, oDiv);
    }
  };
}
const { appendLoading, removeLoading } = useLoading();
domReady().then(appendLoading);
window.onmessage = (ev) => {
  ev.data.payload === "removeLoading" && removeLoading();
};
setTimeout(removeLoading, 4999);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy1lbGVjdHJvbi9wcmVsb2FkL2luZGV4LmpzIl0sInNvdXJjZXNDb250ZW50IjpbImZ1bmN0aW9uIGRvbVJlYWR5KGNvbmRpdGlvbiA9IFsnY29tcGxldGUnLCAnaW50ZXJhY3RpdmUnXSkge1xuICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUpID0+IHtcbiAgICBpZiAoY29uZGl0aW9uLmluY2x1ZGVzKGRvY3VtZW50LnJlYWR5U3RhdGUpKSB7XG4gICAgICByZXNvbHZlKHRydWUpXG4gICAgfSBlbHNlIHtcbiAgICAgIGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ3JlYWR5c3RhdGVjaGFuZ2UnLCAoKSA9PiB7XG4gICAgICAgIGlmIChjb25kaXRpb24uaW5jbHVkZXMoZG9jdW1lbnQucmVhZHlTdGF0ZSkpIHtcbiAgICAgICAgICByZXNvbHZlKHRydWUpXG4gICAgICAgIH1cbiAgICAgIH0pXG4gICAgfVxuICB9KVxufVxuXG5jb25zdCBzYWZlRE9NID0ge1xuICBhcHBlbmQocGFyZW50LCBjaGlsZCkge1xuICAgIGlmICghQXJyYXkuZnJvbShwYXJlbnQuY2hpbGRyZW4pLmZpbmQoKGUpID0+IGUgPT09IGNoaWxkKSkge1xuICAgICAgcmV0dXJuIHBhcmVudC5hcHBlbmRDaGlsZChjaGlsZClcbiAgICB9XG4gIH0sXG4gIHJlbW92ZShwYXJlbnQsIGNoaWxkKSB7XG4gICAgaWYgKEFycmF5LmZyb20ocGFyZW50LmNoaWxkcmVuKS5maW5kKChlKSA9PiBlID09PSBjaGlsZCkpIHtcbiAgICAgIHJldHVybiBwYXJlbnQucmVtb3ZlQ2hpbGQoY2hpbGQpXG4gICAgfVxuICB9XG59XG5cbi8qKlxuICogaHR0cHM6Ly90b2JpYXNhaGxpbi5jb20vc3BpbmtpdFxuICogaHR0cHM6Ly9jb25ub3JhdGhlcnRvbi5jb20vbG9hZGVyc1xuICogaHR0cHM6Ly9wcm9qZWN0cy5sdWtlaGFhcy5tZS9jc3MtbG9hZGVyc1xuICogaHR0cHM6Ly9tYXRlamt1c3RlYy5naXRodWIuaW8vU3BpblRoYXRTaGl0XG4gKi9cbmZ1bmN0aW9uIHVzZUxvYWRpbmcoKSB7XG4gIGNvbnN0IGNsYXNzTmFtZSA9IGBsb2FkZXJzLWNzc19fc3F1YXJlLXNwaW5gXG4gIGNvbnN0IHN0eWxlQ29udGVudCA9IGBcbiAgQGtleWZyYW1lcyBzcXVhcmUtc3BpbiB7XG4gICAgMjUlIHsgdHJhbnNmb3JtOiBwZXJzcGVjdGl2ZSgxMDBweCkgcm90YXRlWCgxODBkZWcpIHJvdGF0ZVkoMCk7IH1cbiAgICA1MCUgeyB0cmFuc2Zvcm06IHBlcnNwZWN0aXZlKDEwMHB4KSByb3RhdGVYKDE4MGRlZykgcm90YXRlWSgxODBkZWcpOyB9XG4gICAgNzUlIHsgdHJhbnNmb3JtOiBwZXJzcGVjdGl2ZSgxMDBweCkgcm90YXRlWCgwKSByb3RhdGVZKDE4MGRlZyk7IH1cbiAgICAxMDAlIHsgdHJhbnNmb3JtOiBwZXJzcGVjdGl2ZSgxMDBweCkgcm90YXRlWCgwKSByb3RhdGVZKDApOyB9XG4gIH1cbiAgLiR7Y2xhc3NOYW1lfSA+IGRpdiB7XG4gICAgYW5pbWF0aW9uLWZpbGwtbW9kZTogYm90aDtcbiAgICB3aWR0aDogNTBweDtcbiAgICBoZWlnaHQ6IDUwcHg7XG4gICAgYmFja2dyb3VuZDogI2ZmZjtcbiAgICBhbmltYXRpb246IHNxdWFyZS1zcGluIDNzIDBzIGN1YmljLWJlemllcigwLjA5LCAwLjU3LCAwLjQ5LCAwLjkpIGluZmluaXRlO1xuICB9XG4gIC5hcHAtbG9hZGluZy13cmFwIHtcbiAgICBwb3NpdGlvbjogZml4ZWQ7XG4gICAgdG9wOiAwO1xuICAgIGxlZnQ6IDA7XG4gICAgd2lkdGg6IDEwMHZ3O1xuICAgIGhlaWdodDogMTAwdmg7XG4gICAgZGlzcGxheTogZmxleDtcbiAgICBhbGlnbi1pdGVtczogY2VudGVyO1xuICAgIGp1c3RpZnktY29udGVudDogY2VudGVyO1xuICAgIGJhY2tncm91bmQ6ICMyODJjMzQ7XG4gICAgei1pbmRleDogOTtcbiAgfVxuICAgICAgYFxuICBjb25zdCBvU3R5bGUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdzdHlsZScpXG4gIGNvbnN0IG9EaXYgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKVxuXG4gIG9TdHlsZS5pZCA9ICdhcHAtbG9hZGluZy1zdHlsZSdcbiAgb1N0eWxlLmlubmVySFRNTCA9IHN0eWxlQ29udGVudFxuICBvRGl2LmNsYXNzTmFtZSA9ICdhcHAtbG9hZGluZy13cmFwJ1xuICBvRGl2LmlubmVySFRNTCA9IGA8ZGl2IGNsYXNzPVwiJHtjbGFzc05hbWV9XCI+PGRpdj48L2Rpdj48L2Rpdj5gXG5cbiAgcmV0dXJuIHtcbiAgICBhcHBlbmRMb2FkaW5nKCkge1xuICAgICAgc2FmZURPTS5hcHBlbmQoZG9jdW1lbnQuaGVhZCwgb1N0eWxlKVxuICAgICAgc2FmZURPTS5hcHBlbmQoZG9jdW1lbnQuYm9keSwgb0RpdilcbiAgICB9LFxuICAgIHJlbW92ZUxvYWRpbmcoKSB7XG4gICAgICBzYWZlRE9NLnJlbW92ZShkb2N1bWVudC5oZWFkLCBvU3R5bGUpXG4gICAgICBzYWZlRE9NLnJlbW92ZShkb2N1bWVudC5ib2R5LCBvRGl2KVxuICAgIH1cbiAgfVxufVxuXG4vLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG5cbmNvbnN0IHsgYXBwZW5kTG9hZGluZywgcmVtb3ZlTG9hZGluZyB9ID0gdXNlTG9hZGluZygpXG5kb21SZWFkeSgpLnRoZW4oYXBwZW5kTG9hZGluZylcblxud2luZG93Lm9ubWVzc2FnZSA9IChldikgPT4ge1xuICBldi5kYXRhLnBheWxvYWQgPT09ICdyZW1vdmVMb2FkaW5nJyAmJiByZW1vdmVMb2FkaW5nKClcbn1cblxuc2V0VGltZW91dChyZW1vdmVMb2FkaW5nLCA0OTk5KVxuIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxTQUFTLFNBQVMsWUFBWSxDQUFDLFlBQVksYUFBYSxHQUFHO0FBQ3pELFNBQU8sSUFBSSxRQUFRLENBQUMsWUFBWTtBQUM5QixRQUFJLFVBQVUsU0FBUyxTQUFTLFVBQVUsR0FBRztBQUMzQyxjQUFRLElBQUk7QUFBQSxJQUNsQixPQUFXO0FBQ0wsZUFBUyxpQkFBaUIsb0JBQW9CLE1BQU07QUFDbEQsWUFBSSxVQUFVLFNBQVMsU0FBUyxVQUFVLEdBQUc7QUFDM0Msa0JBQVEsSUFBSTtBQUFBLFFBQ2I7QUFBQSxNQUNULENBQU87QUFBQSxJQUNGO0FBQUEsRUFDTCxDQUFHO0FBQ0g7QUFFQSxNQUFNLFVBQVU7QUFBQSxFQUNkLE9BQU8sUUFBUSxPQUFPO0FBQ3BCLFFBQUksQ0FBQyxNQUFNLEtBQUssT0FBTyxRQUFRLEVBQUUsS0FBSyxDQUFDLE1BQU0sTUFBTSxLQUFLLEdBQUc7QUFDekQsYUFBTyxPQUFPLFlBQVksS0FBSztBQUFBLElBQ2hDO0FBQUEsRUFDRjtBQUFBLEVBQ0QsT0FBTyxRQUFRLE9BQU87QUFDcEIsUUFBSSxNQUFNLEtBQUssT0FBTyxRQUFRLEVBQUUsS0FBSyxDQUFDLE1BQU0sTUFBTSxLQUFLLEdBQUc7QUFDeEQsYUFBTyxPQUFPLFlBQVksS0FBSztBQUFBLElBQ2hDO0FBQUEsRUFDRjtBQUNIO0FBUUEsU0FBUyxhQUFhO0FBQ3BCLFFBQU0sWUFBWTtBQUNsQixRQUFNLGVBQWU7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQSxLQU9sQjtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBb0JILFFBQU0sU0FBUyxTQUFTLGNBQWMsT0FBTztBQUM3QyxRQUFNLE9BQU8sU0FBUyxjQUFjLEtBQUs7QUFFekMsU0FBTyxLQUFLO0FBQ1osU0FBTyxZQUFZO0FBQ25CLE9BQUssWUFBWTtBQUNqQixPQUFLLFlBQVksZUFBZTtBQUVoQyxTQUFPO0FBQUEsSUFDTCxnQkFBZ0I7QUFDZCxjQUFRLE9BQU8sU0FBUyxNQUFNLE1BQU07QUFDcEMsY0FBUSxPQUFPLFNBQVMsTUFBTSxJQUFJO0FBQUEsSUFDbkM7QUFBQSxJQUNELGdCQUFnQjtBQUNkLGNBQVEsT0FBTyxTQUFTLE1BQU0sTUFBTTtBQUNwQyxjQUFRLE9BQU8sU0FBUyxNQUFNLElBQUk7QUFBQSxJQUNuQztBQUFBLEVBQ0Y7QUFDSDtBQUlBLE1BQU0sRUFBRSxlQUFlLGNBQWUsSUFBRyxXQUFZO0FBQ3JELFNBQVUsRUFBQyxLQUFLLGFBQWE7QUFFN0IsT0FBTyxZQUFZLENBQUMsT0FBTztBQUN6QixLQUFHLEtBQUssWUFBWSxtQkFBbUIsY0FBZTtBQUN4RDtBQUVBLFdBQVcsZUFBZSxJQUFJOyJ9
