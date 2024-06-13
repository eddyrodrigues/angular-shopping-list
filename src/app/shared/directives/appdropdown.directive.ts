import { Directive, HostBinding, HostListener } from '@angular/core';

@Directive({
  selector: '[appDropdown]',
})
export class AppDropdownDirective {
  @HostBinding('class.open') isOpen = false;

  @HostListener('click') DropDownClick() {
    this.isOpen = !this.isOpen;
  }
}
