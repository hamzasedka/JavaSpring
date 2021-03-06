import { Component, OnInit, TemplateRef } from '@angular/core';
import { PopoverContent, PopoverRef } from './popover-ref';

/**
 * See {@link https://netbasal.com/creating-powerful-components-with-angular-cdk-2cef53d81cea}
 */
@Component({
  templateUrl: './popover.component.html',
  styleUrls: ['./popover.component.scss']
})
export class PopoverComponent implements OnInit {
  renderMethod: 'template' | 'component' | 'text' = 'component';
  content: PopoverContent;
  context;

  constructor(private readonly popoverRef: PopoverRef) {}

  ngOnInit(): void {
    this.content = this.popoverRef.content;

    if (typeof this.content === 'string') {
      this.renderMethod = 'text';
    }

    if (this.content instanceof TemplateRef) {
      this.renderMethod = 'template';
      this.context = {
        close: this.popoverRef.close.bind(this.popoverRef)
      };
    }
  }
}
