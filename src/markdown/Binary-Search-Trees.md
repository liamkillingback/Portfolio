G'day! This is my experience learning Binary search trees. I used the Rust language to test out creating trees, searching, adding and deleting nodes. Overall just playing around with it to gain a better understanding.

Prior to this it helps to have knowledge of pointers. I already have an understanding of Linked lists so this is not too much different.

The first thing to note about Binary search trees, compared to a regular binary tree, is that a **Binary search tree** is ordered. From the **Root node** (the first node), values greater than the value of the root node are located in the **right sub-tree**, whereas values that are lesser than are stored in the **left sub-tree**. Like so:

![BST1.png](/assets/BST1.png)

As we can see, **All** of the values to the left of the **root** node are smaller, and all to the right are larger. Same is said to each subsequent **sub-tree**. This example is also what we would call a **Perfect binary search tree** as all levels of the tree are completely filled. The benefit of a BST is that the time it takes to search, add and remove an element is always O(log n), whereas something like a sorted array would be the same for search, but O(n) for adding and removing. There are a few other variants of this such as being **complete, balanced and unbalanced**.

![BST2.png](/assets/BST2.png)

What determines wether a BST is balanced is wether each side of the **root** node has a difference in **height more than 1**.

A complete BST has all nodes except **possibly the last completely filled**, and all nodes are as **left as possible**. Like so:

![BST3.png](/assets/BST3.png)

Now that we understand the layout of BTS's, lets explore how it works on a lower level with **pointers**. Each node contains **three values**, being the value you wish to be stored, a pointer to the left node, and a pointer to the right node. I like to visualize it like this:

![BST4.png](/assets/BST4.png)

With this understanding i started to play around with it. Firstly we have to create a **struct** called Node:
![BST5.png](/assets/BST5.png)
Firstly, we add the #[derive(Debug)] so that we can print our struct in the console, Then we define a **struct** called **Node**, with a value that holds a signed 32-bit integer, and the **left & right** fields which are of type Option Box Node, which is used because the value of left and right could either be **None** or in the only other possible case, contain a pointer to another **Node**, wrapped in **Some()**. For more information about **Box smart pointers** and **Options**, check out the rust docs.

I then created a function that **returns** a sample BST:
![BST6.png](/assets/BST6.png)
The **Root** being 10, left node being 8, and right = 12. I then created some **implementations** for Node **(Methods)**. The first few being the **new** function, which returns an instance of itself with the value given as the argument, and sets left and right to None. **get_left_node** and **get_right_node**, which returns the desired node, then the **add_node** function, which checks the value of the new node and places it appropriately in the BST:

![BST7.png](/assets/BST7.png)

We can see that under the if let statement of **add_node**, we check wether the value is **lesser or equal** to the value of the current nodes value **else** it is greater, then **recursively** calls itself on subsequent nodes until node is **None** in which case we create the new node and return it.

I then created a small program in **main** that searches for a given number, then returns the node/sub-tree with the given value as the root of the sub-tree:

![BST8.png](/assets/BST8.png)

Inside our **sample_binary_tree** function we know that the root node has a value of 10, so this program will actually return the entire BST, as the root node's value is 10.

# Now the hard part

The next part is being able to remove nodes from the BST, without creating any orphaned nodes/trees. There are **three possible cases** for the target node for removal:

1. Has no children
2. Has one child
3. Has two children

## Heres the function and ill elaborate below:

![BST9.png](/assets/BST9.png)
The **first** case is pretty straight forward, we find our target node in the BST, then **check for children**, and if not, set it to None.
The **second** case is also fairly straight forward, we find our target node, then check for left node, and if None, check for right node, and if Some(Node) then we return the nodes child (therefore setting the target node to it's child).

The **third** case needs some more thought, for if you aren't careful you can orphan nodes or whole sub-trees. After some research i found the solution is to find the minimum value of the right sub-tree, then replace it's value with the result, then delete that node, which essentialy reduces the next target node for deletion to either case 1 or 2. Heres an example:
![BST10.png](/assets/BST10.png)

Once we find the min-value, we set the target node to the result, being 18, then recursively call the remove_node function to delete the duplicate value, the result will be this:
![BST11.png](/assets/BST11.png)

As the min-node value was a leaf node ( has no children ) we reduced it to case 1, and deleted it. To find the minimum value i wrote a helper function that returns the min-value node, so that we can then update the target node's value, and call delete on the duplicate value. Heres the rest of the Code:

![BST12.png](/assets/BST12.png)

Where it traverses the BST until it finds the minimum node, otherwise returns itself if it is the only node ofter the root. It is safe to call unwrap here as it is not possible for root to be none in this case.

This wraps up my learning process for Binary search trees and was a nice challenge writing the implementation in rust. I have just started learning rust and will likely touch on that topic soon! hope this was somewhat helpful. The code has been tested and works, and if interested you can find it here on my github: [Click here](https://github.com/liamkillingback/Rust_leet_code/tree/main/binary-search-tree)

Cheers!
