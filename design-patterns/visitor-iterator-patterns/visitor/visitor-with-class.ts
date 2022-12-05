import fetch from 'node-fetch';

class VisitAllPages<DataType> {
  constructor(private baseUrl: string) {}

  // visit will get called back everytime we have data
  async visit(visitor: (results: DataType[]) => void) {
    let nextUrl: string | undefined = this.baseUrl;
    do {
      const response = await fetch(nextUrl);
      const json: {
        next?: string;
        results: DataType[];
      } = (await response.json()) as any;
      visitor(json.results);
      nextUrl = json.next;
    } while (nextUrl);
  }
}

interface Pokemon {
  name: string;
  url: string;
}

const visitor = new VisitAllPages<Pokemon[]>(
  'https://pokeapi.co/api/v2/pokemon'
);

visitor.visit((results) => {
  console.log(results);
});

// We have separated out the traversal of all of the paged api surface from the code that is interprating the results
