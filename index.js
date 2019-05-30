var displayTree = (tree) => console.log(JSON.stringify(tree, null, 2));

function Node(value) {
  this.value = value;
  this.left = null;
  this.right = null;
}

function BinarySearchTree() {
  this.root = null;
  // change code below this line
  this.findMin = function() {
    if (this.root == null) {
      return null
    }
    let currentNode = this.root
    while (currentNode.left) {
      currentNode = currentNode.left
    }
    return currentNode.value
  }

  this.findMax = function(node) {
    if (this.root == null) {
      return null
    }
    var currentNode = this.root;
    while (currentNode.right) {
      currentNode = currentNode.right;
    }
    return currentNode.value;
  }

  this.add = function(value) {
    var node = this.root;
    if (node == null) {
      this.root = new Node(value);
      return undefined;
    } else {
      const searchTree = (node) => {
        if (value < node.value) {
          if (node.left == null) {
            node.left = new Node(value);
            return undefined;
          } else if (node.left !== null) {
            node = node.left
            return searchTree(node)
          }
        } else if (value > node.value) {
          if (node.right == null) {
            node.right = new Node(value);
            return undefined;
          } else if (node.right !== null) {
            node = node.right;
            return searchTree(node);
          }
        } else {
          return null;
        }
      }
      searchTree(node);

    }

  }

  this.search = (node, value) => {
    console.log(value);
    console.log(node.value);
    if (node.value === value) {
      return true;
    } else if (value > node.value && node.right !== null) {
      node = node.right;
      return this.search(node, value);
    } else if (value < node.value && node.left !== null) {
      node = node.left;
      return this.search(node, value)
    } else {
      console.log('not exsit');
      return false;
    }


  }

  this.isPresent = (value) => {
    var node = this.root;
    if (node == null) {
      return false;
    } else {
      return this.search(node, value);
    }
  }

  this.traverseTree = (node, height, heights) => {
    if (node.left == null && node.right == null) {
      return (heights[height] = true);
    }
    if (node.left) {
      this.traverseTree(node.left, height + 1, heights)
    }
    if (node.right) {
      this.traverseTree(node.right, height + 1, heights)
    }
  }


  // change code below this line
  this.findMinHeight = function() {
    var height = 0;
    var heights = {}
    var node = this.root;
    if (node == null) {
      return -1;
    } else {
      this.traverseTree(node, height, heights);
      return Math.min(...Object.keys(heights))
    }

  };

  this.findMaxHeight = function() {
    var height = 0;
    var heights = {}
    var node = this.root;
    if (node == null) {
      return -1;
    } else {
      this.traverseTree(node, height, heights);
      return Math.max(...Object.keys(heights))
    }

  };

  this.isBalanced = function() {
    var max = this.findMaxHeight();
    var min = this.findMinHeight();
    return max >= min + 1;
  }

  this.inorder = () => {
    let result = [];

    function traverseInorder(node) {
      console.log(node);
      if (node.left) {
        traverseInorder(node.left);
      }


      console.log(node.value);
      result.push(node.value);
      //console.log(node)

      if (node.right) {

        traverseInorder(node.right);
      }
      return result;
    }

    if (!this.root) {
      return null
    } else {
      return traverseInorder(this.root);
    }
  }

  this.preorder = () => {
    var array = [];

    function traverseInorder(node) {
      array.push(node.value);
      if (node.left) {
        traverseInorder(node.left)
      }
      if (node.right) {
        traverseInorder(node.right)
      }
      return array;
    }
    if (this.root == null) {
      return null
    } else {
      return (traverseInorder(this.root));
    }
  };



  this.postorder = () => {
    var array = [];

    function traverseInorder(node) {
      console.log(node.left)
      if (node.left) {
        traverseInorder(node.left)
      }
      console.log(node.right)
      if (node.right) {
        traverseInorder(node.right)
      }
      console.log(node.value)
      array.push(node.value);
      return array;
    }
    if (this.root == null) {
      return null
    } else {
      return (traverseInorder(this.root));
    }
  };

  this.levelOrder = () => {
    if (!this.root) {
      return null
    }
    var queue = [this.root];
    var array = [];
    while (queue.length !== 0) {
      var node = queue.shift();
      array.push(node.value);
      if (node.left) {
        queue.push(node.left)
      }
      if (node.right) {
        queue.push(node.right)
      }
    }
    return array
  }

  this.reverseLevelOrder = () => {
    if (!this.root) {
      return null
    }
    var queue = [this.root];
    var array = [];
    while (queue.length !== 0) {
      var node = queue.shift()
      array.push(node.value);
      if (node.right) {
        queue.push(node.right)
      }
      if (node.left) {
        queue.push(node.left)
      }

    }
    return array;
  }


  this.remove = function(value) {
    if (this.root === null) {
      return null;
    }

    var parent = null;
    var minParent = null;
    var target;

    const findValue = (node) => {

      if (value == node.value) {
        target = node;
      } else if (value < node.value && node.left !== null) {
        parent = node;
        return findValue(node.left);
      } else if (value < node.value && node.left === null) {
        return null;
      } else if (value > node.value && node.right !== null) {
        parent = node;
        return findValue(node.right);
      } else {
        return null;
      }
    }

    findValue(node = this.root);

    if (target === null) {
      return null;
    }


    var children = (target.left !== null ? 1 : 0) + (target.right !== null ? 1 : 0);

    if (children === 0) {
      if (target == this.root) {
        this.root = null;
      } else {
        if (parent.left == target) {
          parent.left = null;
        } else {
          parent.right = null;
        }
      }
    }

    if (children === 1) {
      var newChild = (target.left !== null) ? target.left : target.right;
      console.log(newChild)
      //target is the root node    
      if (parent == null) {
        //target.value=newChild.value;
        this.root = newChild;
        target.left = null;
        target.right = null;
      } else if (parent.value > newChild.value) {
        parent.left = newChild;
      } else {
        parent.right = newChild
      }
    }


    //chidlren with 2 node
    function findMinNode(node) {
      // finds the minimum node in the tree,searching starts from given node
      //if left of a node is null,then it must be a minimum node

      if (node.left == null) {
        return node;
      } else {
        minParent = node;
        console.log(minParent);
        return findMinNode(node.left);
      }
    }

    if (children === 2) {
      node = this.root;
      //console.log(node);
      var minNode = findMinNode(node.right);
      target.value = minNode.value;
      if (parent !== null) {
        minParent.left = null
      } else {
        target.right = null;//if the remove node is the root node
      }
    }
  }
  
  
  this.invert=(node=this.root)=>{
      if(this.root==null){
        return null
      }else{
      var temp=node.left;
         node.left=node.right;
         node.right=temp;
  
       if(node.left!==null){
         this.invert(node.left)
         }
         if(node.right!==null){
         this.invert(node.right);
         }        
       }
      
    }
}
var c = new BinarySearchTree();

c.add(10);
c.add(8);
c.add(6);
c.add(15);
c.add(7);
c.add(3);
c.add(16);
c.add(12);
//c.add(13);
//c.add(11);
console.log(c.root)
//console.log(c.isPresent(15))
//console.log(c.isBalanced())
//console.log(c.inorder())
displayTree(c)
c.invert(c.root)
displayTree(c)
//console.log(c.levelOrder())
//console.log(c.remove(10))
//console.log(c.levelOrder())

