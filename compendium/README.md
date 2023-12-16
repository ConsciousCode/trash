Compendium is a personal utility designed to solve a personal issue; my memory is terrible. After forgetting things countless times and being tired of relying on clunky googling or random .txt files, I realized that a much better approach would be to organize my thoughts semantically. This way, I can readily access information just by traversing nodes in a semantic network.

Maybe in the future, this kind of network can be used by AI assistants in organizing user profiles which are doubtless going to be far too complicated for standarization.

### How it works

Compendium works by creating a standardized human-accessible interface (URIs) and abstracting the lower-level details of how the data is stored. Ideally this low-level interface will allow the integration of a diverse set of formats, from JSON to SQL to even HTML scraping and other internet-enabled sources.

The low-level interface does not define a type schema. Instead, it utilizes the format's native types and assumes only that objects contain key-accessed properties, or none at all.
