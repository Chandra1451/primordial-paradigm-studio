// =============================================================================
// Primordial Paradigm Studio - Pure JS Frontmatter Parser
// Extracts YAML frontmatter and markdown body without external dependencies.
// =============================================================================

export function parseFrontmatter(fileContent) {
  const match = fileContent.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n([\s\S]*)$/);

  if (!match) {
    return {
      metadata: {},
      content: fileContent.trim()
    };
  }

  const rawYaml = match[1];
  const markdownBody = match[2].trim();
  const metadata = {};

  const lines = rawYaml.split(/\r?\n/);
  for (const line of lines) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith('#')) continue;

    const colonIdx = trimmed.indexOf(':');
    if (colonIdx === -1) continue;

    const key = trimmed.slice(0, colonIdx).trim();
    let val = trimmed.slice(colonIdx + 1).trim();

    // Remove quotes
    if ((val.startsWith('"') && val.endsWith('"')) || (val.startsWith("'") && val.endsWith("'"))) {
      val = val.slice(1, -1);
    }

    // Parse array syntax [item1, item2]
    if (val.startsWith('[') && val.endsWith(']')) {
      metadata[key] = val.slice(1, -1).split(',').map(s => s.trim().replace(/^['"]|['"]$/g, ''));
    } else {
      metadata[key] = val;
    }
  }

  return { metadata, content: markdownBody };
}

export function estimateReadingTime(text) {
  const wordCount = text.trim().split(/\s+/).length;
  const minutes = Math.max(1, Math.ceil(wordCount / 200));
  return `${minutes} min read`;
}

