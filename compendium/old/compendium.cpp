struct Volume {
	FILE* f;
	
};

struct Node {
	struct Hard {
		uint64_t id;
		uint8_t file;
		size_t offset;
	};

	std::string content;
	std::map<std::string, uint64_t> links;
};

uint8_t read_u8(FILE* f) {
	return fgetc(f);
}

uint64_t read_bu64(FILE* f) {
	uint64_t v = 0;
	for(int i = 0; i < 8; ++i) {
		v *= 256;
		v += fgetc(f);
	}
	
	return v;
}

Node::Hard read_hard(FILE* f) {
	uint64_t id = read_bu64(f);
	uint8_t file = read_u8(f);
	size_t offset = read_bu64(f);
	
	return {id, file, offset};
}

bool bigend_cmp(FILE* f, uint64_t id, int level) {
	for(int i = 8; i > 0; --i) {
		int c = fgetc(f)<<(1<<(i - 1));
		if(c > id) {
		fseek(f, i + (1<<level), SEEK_CUR);
		return false;
		}
	
	if(c < id) {
		fseek(f, i, SEEK_CUR);
		return false;
	}
	}
	
	return true;
}

struct Compendium {
	FILE* f;
	std::vector<std::string> files;
	size_t root;
	
	Compendium(const std::string& index) {
		f = fopen(index.c_str(), "rb");
	if(!f) {
		return;
	}
	uint8_t fc = read_u8(f);
	
	char buf[256];
	for(int i = 0; i < fc; ++i) {
		uint8_t size = read_u8(f);
		fread(&buf[0], sizeof(char), size, f);
		files.push_back(buf);
	}
	
	root = ftell(f);
	}
	
	Node::Hard findRoot(uint64_t id) {
		while(!feof(f)) {
			if(bigend_cmp(f, id)) {
				return read_hard(f);
			}
		}

		return {0};
	}
	
	Node* getRoot(Node::Hard pos) {
		FILE* f = fopen(files[pos.file].c_str(), "r");
		if(!f) {
			return Node::error("File not found.");
		}
	
		fseek(f, pos.offset, SEEK_SET);
		if(feof(f)) {
			return Node::error("Reached EOF before entry offset.");
		}
	
		size_t id = read_bu64(f);
		if(id != pos.id) {
			return Node::error("Loaded entry has the wrong id.");
		}
	
		char dbuf[256];
		uint8_t size = read_u8(f);
		fread(&dbuf[0], sizeof(char), size, f);
	
		Node* n = new Node();
		n->content = dbuf;
	
		char lbuf[16];
		uint8_t lnc = read_u8(f);
		for(int i = 0; i < lnc; ++i) {
			fread(&lbuf[0], sizeof(char), 16, f);
			n->links[lbuf] = read_bu64(f);
		}
	
		return n;
	}
};

constexpr char HELP[] = 
	"compend <cmd> ...\n"
	"  help  Print this help\n"
	"  get   Dump the contents of the given entry\n"
	"  set   Set the entry to a provided value\n"
	"  list  List the links that an entry has\n"
	"  link  Add the first entry as a link to the second, with a given name\n"
	"\n"
;

int main(int argc, char* argv[]) {
	Compendium comp;
	
	if(argc == 1) {
		puts(HELP);
		return 1;
	}
	
	if(argv[1] == std::string{"get"}) {
		if(argc > 2) {
			puts(comp.entry(argv[2]).getContent());
			return 0;
		}
		else {
			puts("Compend-get what?\n");
		}
	}
	else if(argv[1] == std::string{"set"}) {
		if(argc > 2) {
			comp.entry(argv[1]).set(argv[2]);
			return 0;
		}
		else if(argc > 1) {
			fprintf(stderr, "Compend-set %s to what?\n", argv[2]);
		}
		else {
			fprintf(stderr, "Compend-set what?\n");
		}
	}
	else if(argv[1] == std::string{"list"}) {
		puts(comp.entry(argv[2]).list());
		return 0;
	}
	else if(argv[1] == std::string{"link"}) {
		if(argc > 3) {
			comp.entry(argv[1]).link(argv[2], argv[3]);
			return 0;
		}
		else if(argc > 2) {
			fprintf(
				stderr, "Compend-link %s to %s as what?\n", argv[1], argv[2]
			);
		}
		else if(argc > 1) {
			fprintf(stderr, "Compend-link %s to what?\n", argv[1]);
		}
		else {
			fprintf(stderr, "Compend-link what?\n");
		}
	}
	else if(argv[1] == std::string{"help"}) {
		puts(HELP);
	}
	else {
		fprintf(stderr, "Unknown command %s\n", argv[1]);
	}
	
	return 1;
}

