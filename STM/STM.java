import java.util.List;
import java.util.Map;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.Iterator;

/**
 * Structured Text Markup: A text serialization format I've tinkered with making.
 *  Struct is { followed by 0 or more nodes or text: node pairs, then }
 *  Text is quoted or unquoted strings.
 *  Markup is [ followed by a mix of plaintext and data, then ]
 */
public class STM {
    /**
     * Base class for the 3 data types.
     */
    public static abstract class Node {
        /**
         * Type enumeration.
         */
        public static enum Type {
            STRUCT, TEXT, MARKUP
        }

        /**
         * @return The node's dynamic type.
         */
        public abstract Type getType();

        /**
         * @return Node coerced to a Data object, else null.
         */
        public Struct asData() {
            return getType() == Type.STRUCT? (Struct)this : null;
        }

        /**
         * @return Node coerced to a Text object, else null.
         */
        public Text asText() {
            return getType() == Type.TEXT? (Text)this : null;
        }

        /**
         * @return Node coerced to a Markup object, else null.
         */
        public Markup asMarkup() {
            return getType() == Type.MARKUP? (Markup)this : null;
        }
    }

    /**
     * Structured data.
     */
    public static final class Struct extends Node {
        /**
         * Positional attributes.
         */
        private List<Node> positional;
        /**
         * Named attributes.
         */
        private Map<String, Node> named;

        @Override
        public Node.Type getType() { return Node.Type.STRUCT; }

        public Struct() {
            positional = new ArrayList<>();
            named = new HashMap<>();
        }

        /**
         * Add a positional attribute.
         */
        public void addPositional(Node x) {
            positional.add(x);
        }

        /**
         * Add a named attribute.
         */
        public void addNamed(String name, Node x) {
            named.put(name, x);
        }

        /**
         * @return An iterator for the positional attributes
         */
        public Iterator<Node> getPositional() {
            return positional.iterator();
        }
        /**
         * @return An iterator for the named attributes
         */
        public Iterator<Node> getNamed() {
            return named.values().iterator();
        }

        /**
         * @return The number of positional attributes.
         */
        public int positionCount() { return positional.size(); }

        /**
         * Get a positional attribute or null if out of bounds.
         * @param x Index - supports negative indexing.
         * @return The positional attribute.
         */
        public Node get(int x) {
            int sz = positional.size();
            if(x < 0) x += sz;
            if(x < 0 || x >= sz) return null;

            return positional.get(x);
        }

        /**
         * Get a named attribute or null if it doesn't exist.
         * @param x The name.
         * @return The attribute.
         */
        public Node get(String x) {
            return named.getOrDefault(x, null);
        }
    }

    /**
     * Unstructured data represented as text.
     */
    public static final class Text extends Node {
        /**
         * Internal text field.
         */
        private String text;

        @Override
        public Node.Type getType() { return Node.Type.TEXT; }

        public Text(String x) {
            assert x != null;
            text = x;
        }

        /**
         * @return The string of the text.
         */
        public String getText() {
            return text;
        }
    }

    /**
     * Loosely structured data.
     */
    public static final class Markup extends Node implements Iterable {
        /**
         * The nodes of the markup (Text or Data only).
         */
        private List<Node> nodes;

        @Override
        public Node.Type getType() { return Node.Type.MARKUP; }

        @Override
        public Iterator<Node> iterator() {
            return nodes.iterator();
        }

        /**
         * Get the node at a given index or null if out of bounds.
         * @param x Index - supports negative indexing.
         * @return The node at the index.
         */
        public Node get(int x) {
            int sz = nodes.size();
            if(x < 0) x += sz;
            if(x < 0 || x >= sz) return null;

            return nodes.get(x);
        }
    }
}