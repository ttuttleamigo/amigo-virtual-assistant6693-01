
export interface MessageFormat {
  type: 'simple' | 'bulleted' | 'numbered' | 'structured';
  content: string | string[];
}

export const messageFormatter = {
  formatMessage: (content: string | string[]): string => {
    if (Array.isArray(content)) {
      return content.join('\n\n');
    }
    return content;
  },
  
  createBulletList: (items: string[], title?: string): string => {
    const bullets = items.map(item => `• ${item}`).join('\n');
    return title ? `${title}\n\n${bullets}` : bullets;
  },
  
  createNumberedList: (items: string[], title?: string): string => {
    const numbered = items.map((item, index) => `${index + 1}. ${item}`).join('\n');
    return title ? `${title}\n\n${numbered}` : numbered;
  },
  
  createStructuredMessage: (sections: { title?: string; content: string }[]): string => {
    return sections.map(section => 
      section.title ? `**${section.title}**\n${section.content}` : section.content
    ).join('\n\n');
  }
};
