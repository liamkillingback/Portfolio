Starting from where my previous blog left off on Binary Search Trees, I thought it only natural to learn how to traverse them as well as adding finding and removing from them. As in the last, i will be using rust to build and demonstrate the different algorithms used for traversal.

The first type of traversal is called breadth-first where we go level by level, left to right like so: 

![BSTT1.png](/assets/BSTT1.png)

My first thought is how on earth do you traverse like this as once you say go to the 5 node, your pointer to node 18 will be lost... right? Well not if you push the nodes into a FIFO (first in first out) queue. In this case i used a vector to store the references to each node. Heres the function and struct code:

```rust
#[derive(Debug)]
struct Node {
    value: i32,
    left: Option<Box<Node>>,
    right: Option<Box<Node>>,
}
impl Node {

    fn level_order_traversal(root: Option<Box<Node>>) {
        let mut queue: Vec<&Option<Box<Node>>> = vec![];
        queue.push(&root);
        
        while !queue.is_empty() {
            let current = queue[0].as_ref().unwrap();
            if current.left.is_some() { queue.push(&current.left) }
            if current.right.is_some() { queue.push(&current.right) }
            
            println!("{:#?}", current.value);
            queue.remove(0);
        }
    }
}
```

![BSTT2.png](/assets/BSTT2.png)

It was actually way more straight forward than i thought! Now... onto depth first searches. The three types are **Preorder, Inorder and Postorder**. The way we will implement them will be through reccursion, but first lets take a look at how depth first searches look like:

![BSTT3.png](/assets/BSTT3.png)

With **Preorder traversal**, we **Print** the current value (10), then recursively call the function on the left node, then if there is a node, **print it (8)**, then call the function again on it, and if there is a left node, call function, then **print it (5)** then check for left node, **None**, then right node **None** then the function called on **5 is complete** and we will **return** to the function where 8 is the root, and then proceed to calling the function on the **right node (9)**, it will **print**, and as it has no children the **function will complete**, then **return to 8**, which is now complete, which will **return to 10**, which will continue by calling the function on 12 etc. This kind of reccursion creates a stack of function calls in memory and completes them one at a time, **First in last out**.

I'll leave it to you to determine the behaviour for the other two types, but here is the working methods in Rust: 
```rust
fn preorder_traversal(root: Option<Box<Node>>) {
	if let Some(node) = root {
		println!("{}", node.value);
		Node::preorder_traversal(node.left);
		Node::preorder_traversal(node.right);
	}
}
fn inorder_traversal(root: Option<Box<Node>>) {
	if let Some(node) = root {
		Node::inorder_traversal(node.left);
		println!("{}", node.value);
		Node::inorder_traversal(node.right);
	}
}
fn postorder_traversal(root: Option<Box<Node>>) {
	if let Some(node) = root {
		Node::postorder_traversal(node.left);
		Node::postorder_traversal(node.right);
		println!("{}", node.value);
	}
}
```

Notice you only have to change where the print statement is, and in this case we are only printing out the data, but you can swap this for something else depending on what you want to do with the data. Here is the full code with a sample tree thats the same as the diagram above! 

```rust
#[derive(Debug)]
struct Node {
    value: i32,
    left: Option<Box<Node>>,
    right: Option<Box<Node>>,
}
  
impl Node {
    fn level_order_traversal(root: Option<Box<Node>>) {
        let mut queue: Vec<&Option<Box<Node>>> = vec![];
        queue.push(&root);
        while !queue.is_empty() {
            let current = queue[0].as_ref().unwrap();
            if current.left.is_some() { queue.push(&current.left) }
            if current.right.is_some() { queue.push(&current.right) }
            println!("{:#?}", current.value);
            queue.remove(0);
        }
    }
    fn preorder_traversal(root: Option<Box<Node>>) {
        if let Some(node) = root {
            println!("{}", node.value);
            Node::preorder_traversal(node.left);
            Node::preorder_traversal(node.right);
        }
    }
    fn inorder_traversal(root: Option<Box<Node>>) {
        if let Some(node) = root {
            Node::inorder_traversal(node.left);
            println!("{}", node.value);
            Node::inorder_traversal(node.right);
        }
    }
    fn postorder_traversal(root: Option<Box<Node>>) {
        if let Some(node) = root {
            Node::postorder_traversal(node.left);
            Node::postorder_traversal(node.right);
            println!("{}", node.value);
        }
    }
}
   
fn main() {
    let list = Some(Box::new(Node {
        value: 10,
        left: Some(Box::new(Node {
            value: 8,
            left: Some(Box::new(Node {
                value: 5,
                left: None,
                right: None
            })),
            right: Some(Box::new(Node {
                value: 9,
                left: None,
                right: None,
            })),
        })),
        right: Some(Box::new(Node {
            value: 12,
            left: Some(Box::new(Node {
                value: 11,
                left: None,
                right: None,
            })),
            right: Some(Box::new(Node {
                value: 13,
                left: None,
                right: None
            }))
        }))
    }));
  
    // Node::level_order_traversal(list);
    // Node::preorder_traversal(list);
    // Node::inorder_traversal(list);
    Node::postorder_traversal(list);
}
```

And that's alll folks! I've always wondered how the heck depth first searches start at the last elements somehow, and now i know! 