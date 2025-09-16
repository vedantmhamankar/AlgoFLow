import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import "./Array.css";

// Node structure
class TreeNode {
  constructor(value) {
    this.value = value;
    this.left = null;
    this.right = null;
  }
}

function TreeCr() {
  const [root, setRoot] = useState(null);
  const [inputValue, setInputValue] = useState("");
  const [showTree, setShowTree] = useState(false);
  const [message, setMessage] = useState("");

  // handle input
  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  // insert node (level order)
  const insertNode = (value) => {
    const newNode = new TreeNode(value);
    if (!root) {
      setRoot(newNode);
      setShowTree(true);
      return;
    }

    const queue = [root];
    while (queue.length) {
      const node = queue.shift();
      if (!node.left) {
        node.left = newNode;
        break;
      } else queue.push(node.left);

      if (!node.right) {
        node.right = newNode;
        break;
      } else queue.push(node.right);
    }

    setRoot({ ...root }); // force re-render with updated tree
  };

  // delete node by value
  const deleteNode = (value) => {
    if (!root) return;

    // Special case: only root exists
    if (!root.left && !root.right && root.value === value) {
      setRoot(null);
      setShowTree(false);
      return;
    }

    let nodeToDelete = null;
    let lastNode = null;
    let queue = [root];

    while (queue.length) {
      let node = queue.shift();
      if (node.value === value) nodeToDelete = node;
      if (node.left) {
        lastNode = node;
        queue.push(node.left);
      }
      if (node.right) {
        lastNode = node;
        queue.push(node.right);
      }
    }

    if (nodeToDelete && lastNode) {
      if (lastNode.right) {
        nodeToDelete.value = lastNode.right.value;
        lastNode.right = null;
      } else if (lastNode.left) {
        nodeToDelete.value = lastNode.left.value;
        lastNode.left = null;
      }
      setRoot({ ...root });
    }
  };

  // traversals
  const inorder = (node, result = []) => {
    if (node) {
      inorder(node.left, result);
      result.push(node.value);
      inorder(node.right, result);
    }
    return result;
  };

  const preorder = (node, result = []) => {
    if (node) {
      result.push(node.value);
      preorder(node.left, result);
      preorder(node.right, result);
    }
    return result;
  };

  const postorder = (node, result = []) => {
    if (node) {
      postorder(node.left, result);
      postorder(node.right, result);
      result.push(node.value);
    }
    return result;
  };

  const levelorder = (node) => {
    if (!node) return [];
    const res = [];
    const queue = [node];
    while (queue.length) {
      const cur = queue.shift();
      res.push(cur.value);
      if (cur.left) queue.push(cur.left);
      if (cur.right) queue.push(cur.right);
    }
    return res;
  };

  // visualize tree (level order as boxes)
  const visualizeTree = () => {
    if (!root) return [];
    const res = [];
    const queue = [root];
    while (queue.length) {
      const cur = queue.shift();
      res.push(cur.value);
      if (cur.left) queue.push(cur.left);
      if (cur.right) queue.push(cur.right);
    }
    return res;
  };

  // clear
  const clearTree = () => {
    setRoot(null);
    setShowTree(false);
    setMessage("");
  };

  return (
    <div className="page">
      <h1 className="arr">Binary Tree</h1>
      <input
        className="arrin"
        type="text"
        placeholder="enter node value"
        value={inputValue}
        onChange={handleInputChange}
      />
      <motion.button
        className="createbtn"
        onClick={() => {
          if (inputValue.trim() !== "") {
            insertNode(inputValue.trim());
            setMessage(`Inserted: ${inputValue}`);
            setInputValue("");
          }
        }}
      >
        Insert
      </motion.button>
      <motion.button
        className="clearbtn"
        onClick={() => {
          if (inputValue.trim() !== "") {
            deleteNode(inputValue.trim());
            setMessage(`Deleted: ${inputValue}`);
            setInputValue("");
          }
        }}
      >
        Delete
      </motion.button>
      <motion.button className="clearbtn" onClick={clearTree}>
        Clear
      </motion.button>

      <div className="arrayvisualization">
        {showTree && (
          <AnimatePresence>
            <motion.div
              className="dis"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.4 }}
            >
              {visualizeTree().map((item, index) => (
                <motion.div
                  key={index}
                  className="bound"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  style={{ backgroundColor: "#A3DC9A" }}
                >
                  {item}
                </motion.div>
              ))}
            </motion.div>
          </AnimatePresence>
        )}
      </div>

      <div className="operations">
        <nav className="options">
          <ul>
            <li
              style={{
                display: "inline",
                cursor: "pointer",
                paddingLeft: "100px",
                color: "white",
              }}
              onClick={() =>
                setMessage("Inorder: " + inorder(root).join(", "))
              }
            >
              Inorder
            </li>
            <li
              style={{
                display: "inline",
                cursor: "pointer",
                paddingLeft: "100px",
                color: "white",
              }}
              onClick={() =>
                setMessage("Preorder: " + preorder(root).join(", "))
              }
            >
              Preorder
            </li>
            <li
              style={{
                display: "inline",
                cursor: "pointer",
                paddingLeft: "100px",
                color: "white",
              }}
              onClick={() =>
                setMessage("Postorder: " + postorder(root).join(", "))
              }
            >
              Postorder
            </li>
            <li
              style={{
                display: "inline",
                cursor: "pointer",
                paddingLeft: "100px",
                color: "white",
              }}
              onClick={() =>
                setMessage("Levelorder: " + levelorder(root).join(", "))
              }
            >
              Levelorder
            </li>
          </ul>
        </nav>
      </div>

      {message && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.4 }}
          style={{
            backgroundColor: "#333",
            color: "white",
            marginTop: "20px",
            marginLeft: "40px",
            padding: "10px",
            borderRadius: "10px",
            width: "400px",
          }}
        >
          {message}
        </motion.div>
      )}
    </div>
  );
}

export default TreeCr;
