dojo.provide("widget.AuthorWidget");
 
dojo.require("dijit._Widget");
dojo.require("dijit._Templated");
 
dojo.declare("widget.AuthorWidget", [dijit._Widget, dijit._Templated], {
    name: "No Name",
    avatar: dojo.moduleUrl("widget", "images/defaultAvatar.png"),
    bio: "",
    templateString:
        dojo.cache("widget", "templates/AuthorWidget.html"),
    baseClass: "authorWidget",
    mouseAnim: null,
    baseBackgroundColor: "#fff",
    mouseBackgroundColor: "#def",
    postCreate: function(){
        var domNode = this.domNode;
        this.inherited(arguments);
        dojo.style(domNode, "backgroundColor", this.baseBackgroundColor);
        this.connect(domNode, "onmouseenter", function(e) {
            this._changeBackground(this.mouseBackgroundColor);
        });
        this.connect(domNode, "onmouseleave", function(e) {
            this._changeBackground(this.baseBackgroundColor);
        });
    },
    _changeBackground: function(toCol) {
        if (this.mouseAnim) { this.mouseAnim.stop(); }
     
        this.mouseAnim = dojo.animateProperty({
            node: this.domNode,
            properties: {
                backgroundColor: toCol
            },
            onEnd: dojo.hitch(this, function() {
                this.mouseAnim = null;
            })
        }).play();
    },
    _setAvatarAttr: function(av) {
        if (av !== "") {
            this._set("avatar", av);
            this.avatarNode.src = av;
        }
    }
});