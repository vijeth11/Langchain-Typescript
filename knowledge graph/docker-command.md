#### Below is the docker command to create and start the neo4j database in local. But use docker compose as it requires some extra config for loading data and connecting with llm

<code>
    docker run -d --restart always --publish=7474:7474 --publish=7687:7687 --name neo4jdb --env NEO4J_AUTH=neo4j/movie_data --env NEO4J_PLUGINS='["apoc"]' --env NEO4J_dbms_security_procedures_unrestricted=apoc.* --env NEO4J_dbms_security_procedures_allowlist=apoc.* --volume "D:\GitHub\AI Agents courses\langchain-course\First AI Agent Using OpenAI TS Langchain\knowledge graph\data:/data" neo4j:2026.09.0
</code>


#### Below is the Cypher Query used to populate the database with movie data

<code>

    LOAD CSV WITH HEADERS FROM
    'https://raw.githubusercontent.com/tomasonjo/blog-datasets/main/movies/movies_small.csv' as row
    MERGE (m:Movie{id:row.movieId})
    SET m.released = date(row.released),
        m.title = row.title,
        m.imdbRating = toFloat(row.imdbRating)
    FOREACH (director in split(row.director, '|') |
        MERGE (p:Person {name:trim(director)})
        MERGE (p)-[:DIRECTED]->(m))
    FOREACH (actor in split(row.actors, '|') |
        MERGE (p:Person {name:trim(actor)})
        MERGE (p)-[:ACTED_IN]->(m))
    FOREACH (genre in split(row.genres, '|') |
        MERGE (g:Genre {name:trim(genre)})
        MERGE (m)-[:IN_GENRE]->(g))

</code>


#### Sample query to add single data with relation

<code>

    CREATE (a:Actor {name:'Bruce Willis'})
  -[:ACTED_IN]->(:Movie {title: 'Pulp Fiction'})

</code>

#### Sample Query to retrieve data from graph 

<code>

    MATCH (m:Movie)-[:IN_GENRE]->(:Genre {name:$genre})
    RETURN m.title, m.plot
    ORDER BY m.imdbRating DESC LIMIT 5

</code>