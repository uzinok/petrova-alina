window.onload = function() {
	let e = document.createElement("style");
	e.innerHTML = ".details-hide{overflow:hidden;opacity:0;max-height:0;-webkit-transition:max-height 200ms,opacity 200ms;-o-transition:max-height 200ms,opacity 200ms;transition:max-height 200ms,opacity 200ms}.details-visible .details-hide{overflow:auto;opacity:1;max-height:100vh}.details_h .details-hide{display:none}details>button{border-radius:none;border:0;-webkit-box-shadow:none;box-shadow:none;background:0 0;font-family:none;font-size:none;padding:0;text-align:inherit}", document.head.appendChild(e);
	let t = document.querySelectorAll("details");
	for (let e = 0; e < t.length; e++) {
		let i;
		if (t[e].querySelector("summary")) {
			if (i = t[e].querySelector("summary"), !("open" in t[e])) {
				let n = document.createElement("button");
				n.innerHTML = i.innerHTML, n.setAttribute("class", i.getAttribute("class")), t[e].insertBefore(n, i), t[e].removeChild(i), i = n
			}
		} else(i = "open" in t[e] ? document.createElement("summary") : document.createElement("button")).innerHTML = "подробнее", t[e].insertBefore(i, t[e].querySelector(".details-hide"));
		t[e].hasAttribute("open") ? t[e].classList.add("details-visible") : "open" in t[e] || t[e].classList.add("details_h"), i.addEventListener("click", function(e) {
			let t = this.parentNode;
			t.classList.contains("details-visible") ? (e.preventDefault(), t.classList.remove("details-visible"), setTimeout(function() {
				"open" in t ? t.open = !1 : t.classList.add("details_h")
			}, 200)) : (t.classList.remove("details_h"), setTimeout(function() {
				t.classList.add("details-visible")
			}, 5))
		})
	}
};
